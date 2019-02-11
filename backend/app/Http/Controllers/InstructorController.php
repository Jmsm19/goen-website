<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\SimpleInstructorResource;

class InstructorController extends Controller
{
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
}
