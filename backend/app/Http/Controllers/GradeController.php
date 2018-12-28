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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return GradeResource::collection(Grade::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
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
     * Display the specified resource.
     *
     * @param  \App\Grade  $grade
     * @return \Illuminate\Http\Response
     */
    public function show(Grade $grade)
    {
        return new GradeResource($grade);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Grade  $grade
     * @return \Illuminate\Http\Response
     */
    public function update(GradeUpdateRequest $request, Grade $grade)
    {
        $grade->update($request->only(['score']));
        return new GradeResource($grade);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Grade  $grade
     * @return \Illuminate\Http\Response
     */
    public function destroy(Grade $grade)
    {
        $grade->delete();
        return response()->json(null, 204);
    }
}
