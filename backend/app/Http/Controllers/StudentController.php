<?php

namespace App\Http\Controllers;

use App\User;
use App\Module;
use App\Period;
use Spatie\Dropbox\Client;
use Illuminate\Http\Request;
use App\Events\PaymentAccepted;
use App\Events\PaymentRejected;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ImageUploadRequest;

class StudentController extends Controller
{
    public function __construct()
    {
        $this->dropbox = Storage::disk('dropbox')->getDriver()->getAdapter()->getClient();
    }

    private function makeImageName($user)
    {
        $username = implode('_', explode(' ', $user->name));
        $national_id = $user->national_id;
        $current_module = $user->currentModule();
        $module = $current_module->name . '_' . $current_module->section;

        return "{$username}_{$national_id}_{$module}.jpg";
    }

    /**
    * @OA\Post(path="/api/module/{module}/register",
    *   tags={"Role: Student"},
    *   summary="If possible, register student in module.",
    *   operationId="studentRegister",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of module",
    *       in="path",
    *       name="module",
    *       required=true,
    *       @OA\Schema(format="int64", type="integer")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Successful registration",
    *       @OA\JsonContent(ref="#/components/schemas/ResponseMessage")
    *   ),
    *   @OA\Response(
    *       response=400,
    *       description="Error due to: registration_outside_threshold, already_registered_in_module, only_one_module_per_period, wrong_next_module, module_full, etc.",
    *       @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
    *   )
    * )
    */
    public function register(Request $request, Module $module)
    {
        $student = $request->user();

        if ($student->isNotWithinRegistrationThresholdOf($module->period)) {
            return response()->json([
                'error' => trans('messages.registration_outside_threshold')
            ], 400);
        }

        if ($student->isStudentIn($module)) {
            return response()->json([
                'error' => trans('messages.already_registered_in_module')
            ], 400);
        }

        if ($student->isRegisteredInPeriodOf($module)) {
            return response()->json([
                'error' => trans('messages.only_one_module_per_period')
            ], 400);
        }

        $is_correct_for_student = $module->isCorrectFor($student);
        $is_correct = $is_correct_for_student[0];
        $correct_module = $is_correct_for_student[1];
        if (!$is_correct) {
            return response()->json([
                'error' => trans('messages.wrong_next_module', ['module' => $correct_module])
            ], 400);
        }

        if (!$module->hasSpace()) {
            return response()->json([
                'error' => trans('messages.module_full')
            ], 400);
        }

        $student->registerIn($module);
        return response()->json([
            'message' => trans('messages.succesfully_registered')
        ], 200);
    }

    /**
    * @OA\Post(path="/api/module/register/send-capture",
    *   tags={"Role: Student"},
    *   summary="Upload transfer capture image to Dropbox's comprobantes folder.",
    *   operationId="uploadTransferCapture",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\RequestBody(
    *       required=true,
    *       @OA\MediaType(
    *           mediaType="multipart/form-data",
    *           @OA\Schema(
    *               required={"file"},
    *               @OA\Property(
    *                   description="Bank transfer confirmation picture.",
    *                   property="image",
    *                   type="file",
    *                   format="file",
    *               ),
    *           )
    *       )
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Successful image upload",
    *       @OA\JsonContent(ref="#/components/schemas/ImageUploaded")
    *   )
    * )
    */
    public function uploadTransferCapture(ImageUploadRequest $request)
    {
        $period = Period::where('active', 1)->first();
        $image = Input::file('image');
        $user = $request->user();

        $image_name = $this->makeImageName($user);
        $period_name = "Período {$period->name}-{$period->year}";

        $root_folder = 'comprobantes';
        Storage::disk('dropbox')->putFileAs("{$root_folder}/{$period_name}", $image, $image_name);

        $image_full_path = "{$root_folder}/{$period_name}/{$image_name}";
        $shared_links = $this->dropbox->listSharedLinks($image_full_path);

        if (count($shared_links) > 0) {
            $response = $shared_links[0];
            $user->setRegistrationStatus("verifying payment");
            return response()->json([
                'id' => $response['id'],
                'name' => $response['name'],
                'url' => $response['url'],
                'status' => $user->registration_status
            ], 200);
        }

        $response = $this->dropbox->createSharedLinkWithSettings(
            $image_full_path,
            ["requested_visibility" => "public"]
        );

        $user->setRegistrationStatus("verifying payment");
        return response()->json([
            'id' => $response['id'],
            'name' => $response['name'],
            'url' => $response['url'],
            'status' => $user->registration_status
        ], 200);
    }

    /**
    * @OA\Post(path="/api/student/{student}/confirm-payment",
    *   tags={"Role: Admin"},
    *   summary="Confirm student payment.",
    *   description="Email is sent to notify student.",
    *   operationId="confirmPayment",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of student",
    *       in="path",
    *       name="student",
    *       required=true,
    *       @OA\Schema(format="int64", type="integer")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Successful payment confirmation",
    *       @OA\JsonContent(ref="#/components/schemas/ResponseMessage")
    *   )
    * )
    */
    public function confirmPayment(User $student)
    {
        $module = $student->currentModule();
        $student->setRegistrationStatus('registered');

        if (!$student->hasClan() && $student->currentModule()->name === "M-0") {
            $student->clan_id = $module->clan->id;
            $student->save();
        }

        event(new PaymentAccepted($student, $module));

        return response()->json([
            'message' => trans('message.student_registered')
        ], 200);
    }

    /**
    * @OA\Post(path="/api/student/{student}/reject-payment",
    *   tags={"Role: Admin"},
    *   summary="Reject student payment.",
    *   description="Email is sent to notify student.",
    *   operationId="rejectPayment",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of student",
    *       in="path",
    *       name="student",
    *       required=true,
    *       @OA\Schema(format="int64", type="integer")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Successful payment confirmation",
    *       @OA\JsonContent(ref="#/components/schemas/ResponseMessage")
    *   )
    * )
    */
    public function rejectPayment(User $student)
    {
        $student->setRegistrationStatus('paying');

        event(new PaymentRejected($student));

        return response()->json([
            'message' => trans('message.invalid_payment')
        ], 200);
    }
}
