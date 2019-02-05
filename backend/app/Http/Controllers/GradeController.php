<?php

namespace App\Http\Controllers;

use App\Grade;
use Illuminate\Http\Request;
use App\Http\Resources\GradeResource;
use App\Http\Requests\GradeStoreRequest;
use App\Http\Requests\GradeUpdateRequest;

class GradeController extends Controller
{
    /**
    * @OA\Get(path="/api/grade",
    *   tags={"Model: Grade", "Role: Instructor"},
    *   summary="Display a listing of Grades",
    *   operationId="getAllGrades",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Response(
    *       response=200,
    *       description="Grades found",
    *       @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/GradeCollection"))
    *   )
    * )
    */
    public function index()
    {
        return GradeResource::collection(Grade::all());
    }

    /**
    * @OA\Post(path="/api/grade",
    *   tags={"Model: Grade", "Role: Instructor"},
    *   summary="Store grade",
    *   operationId="storeGrade",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Grade's score",
    *       in="query",
    *       name="score",
    *       required=true,
    *       @OA\Schema(type="number", format="double")
    *   ),
    *   @OA\Parameter(
    *       description="Grade's module id",
    *       in="query",
    *       name="module_id",
    *       required=true,
    *       @OA\Schema(type="integer", format="int64")
    *   ),
    *   @OA\Parameter(
    *       description="Grade's user id",
    *       in="query",
    *       name="user_id",
    *       required=true,
    *       @OA\Schema(type="integer", format="int64")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Returns created grade",
    *       @OA\JsonContent(ref="#/components/schemas/SingleGrade")
    *   )
    * )
    */
    public function store(GradeStoreRequest $request)
    {
        $grade = Grade::create([
            'score' => $request->score,
            'module_id' => $request->module_id,
            'user_id' => $request->user_id,
        ]);

        return new GradeResource($grade);
    }

    /**
    * @OA\Get(path="/api/grade/{grade}",
    *   tags={"Model: Grade", "Role: Instructor"},
    *   summary="Get a Grade by Id",
    *   operationId="getGradeById",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of grade",
    *       in="path",
    *       name="grade",
    *       required=true,
    *       @OA\Schema(type="integer", format="int64")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Grade found",
    *       @OA\JsonContent(ref="#/components/schemas/SingleGrade")
    *   )
    * )
    */
    public function show(Grade $grade)
    {
        return new GradeResource($grade);
    }

    /**
    * @OA\Put(path="/api/grade/{grade}",
    *   tags={"Model: Grade", "Role: Instructor"},
    *   summary="Update grade data",
    *   operationId="updateGrade",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of grade",
    *       in="path",
    *       name="grade",
    *       required=true,
    *       @OA\Schema(type="integer",format="int64")
    *   ),
    *   @OA\Parameter(
    *       description="Grade's new score",
    *       in="query",
    *       name="score",
    *       @OA\Schema(type="number", format="double")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Returns updated grade",
    *       @OA\JsonContent(ref="#/components/schemas/SingleGrade")
    *   )
    * )
    */
    public function update(GradeUpdateRequest $request, Grade $grade)
    {
        $grade->update($request->only(['score']));
        return new GradeResource($grade);
    }

    /**
    * @OA\Delete(path="/api/grade/{grade}",
    *   tags={"Model: Grade", "Role: Instructor"},
    *   summary="Delete grade",
    *   operationId="deleteGrade",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of grade",
    *       in="path",
    *       name="grade",
    *       required=true,
    *       @OA\Schema(type="integer", format="int64")
    *   ),
    *   @OA\Response(
    *       response=204,
    *       description="Grade deleted",
    *   )
    * )
    */
    public function destroy(Grade $grade)
    {
        $grade->delete();
        return response()->json(null, 204);
    }
}
