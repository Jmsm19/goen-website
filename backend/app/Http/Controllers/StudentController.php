<?php

namespace App\Http\Controllers;

use App\Module;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * If possible, register student in module
     * @param \Illuminate\Http\Request $request
     * @param \App\Module $module
     * @return \Illuminate\Http\Response
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
}
