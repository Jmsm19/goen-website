<?php

namespace App\Http\Controllers;

use App\User;
use App\Traits\RoleTrait;
use Illuminate\Http\Request;
use App\Http\Controllers\RolesController;
use App\Http\Resources\SimpleInstructorResource;

class InstructorController extends Controller
{
    use RoleTrait;

    /**
    * @OA\Get(path="/api/instructor",
    *   tags={"Model: Instructor", "Role: Admin"},
    *   summary="Display a listing of Instructors",
    *   operationId="getAllInstructors",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Response(
    *       response=200,
    *       description="Instructors found",
    *       @OA\JsonContent(ref="#/components/schemas/InstructorCollection")
    *   )
    * )
    */
    public function index()
    {
        $instructors = User::whereHas('roles', function ($query) {
            $query->where('name', 'instructor');
        })->get();
        return SimpleInstructorResource::collection($instructors);
    }

    public function addInstructorRole($id)
    {
        $role = 'instructor';
        $instructor = $this->addRole($id, $role);

        if (is_null($instructor)) {
            return response()->json([
                'error' => trans('messages.has_role', ['role' => $role]),
            ], 400);
        }

        return response()->json([
            'message' => trans('messages.role_added', ['role' => $role]),
            'instructor' => new SimpleInstructorResource($instructor)
         ], 200);
    }
}
