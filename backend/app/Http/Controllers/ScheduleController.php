<?php

namespace App\Http\Controllers;

use App\Schedule;
use Illuminate\Http\Request;
use App\Http\Resources\ScheduleResource;
use App\Http\Requests\ScheduleStoreRequest;
use App\Http\Requests\ScheduleUpdateRequest;

class ScheduleController extends Controller
{
    /**
    * @OA\Get(path="/api/schedule",
    *   tags={"Model: Schedule"},
    *   summary="Display a listing of Grades",
    *   operationId="getAllGrades",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Response(
    *       response=200,
    *       description="Schedules found",
    *       @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/ScheduleCollection"))
    *   )
    * )
    */
    public function index()
    {
        return ScheduleResource::collection(Schedule::all());
    }

    /**
    * @OA\Post(path="/api/schedule",
    *   tags={"Model: Schedule"},
    *   summary="Store schedule",
    *   operationId="storeSchedule",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Class date",
    *       in="query",
    *       name="start_date",
    *       required=true,
    *       @OA\Schema(type="string", format="date")
    *   ),
    *   @OA\Parameter(
    *       description="Class start time",
    *       in="query",
    *       name="from",
    *       required=true,
    *       @OA\Schema(type="string")
    *   ),
    *   @OA\Parameter(
    *       description="Class end time",
    *       in="query",
    *       name="until",
    *       required=true,
    *       @OA\Schema(type="string")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Returns created schedule",
    *       @OA\JsonContent(ref="#/components/schemas/SingleSchedule")
    *   ),
    *   @OA\Response(
    *       response=400,
    *       description="Schedule already exists",
    *       @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
    *   )
    * )
    */
    public function store(ScheduleStoreRequest $request)
    {
        // Check if as similar Schedule already exists
        $schedule = Schedule::where([
            'start_date' => $request->start_date,
            'from' => $request->from,
            'until' => $request->until
        ])->get();


        if (count($schedule) >= 1) {
            return response()->json([
                'error' => trans('messages.schedule_exists')
            ], 400);
        }

        $schedule = Schedule::create([
            'start_date' => $request->start_date,
            'from' => $request->from,
            'until' => $request->until
        ]);

        return new ScheduleResource($schedule);
    }

    /**
    * @OA\Get(path="/api/schedule/{schedule}",
    *   tags={"Model: Schedule"},
    *   summary="Get a Schedule by Id",
    *   operationId="getScheduleById",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of schedule",
    *       in="path",
    *       name="schedule",
    *       required=true,
    *       @OA\Schema(type="integer", format="int64")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Schedule found",
    *       @OA\JsonContent(ref="#/components/schemas/SingleSchedule")
    *   )
    * )
    */
    public function show(Schedule $schedule)
    {
        return new ScheduleResource($schedule);
    }

    /**
    * @OA\Put(path="/api/schedule/{schedule}",
    *   tags={"Model: Schedule"},
    *   summary="Update schedule data",
    *   operationId="updateSchedule",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of schedule",
    *       in="path",
    *       name="schedule",
    *       required=true,
    *       @OA\Schema(type="integer",format="int64")
    *   ),
    *   @OA\Parameter(
    *       description="Class start time",
    *       in="query",
    *       name="from",
    *       @OA\Schema(type="string")
    *   ),
    *   @OA\Parameter(
    *       description="Class end time",
    *       in="query",
    *       name="until",
    *       @OA\Schema(type="string")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Returns updated schedule",
    *       @OA\JsonContent(ref="#/components/schemas/SingleSchedule")
    *   )
    * )
    */
    public function update(ScheduleUpdateRequest $request, Schedule $schedule)
    {
        $schedule->update($request->only(['start_date', 'from', 'until']));
        return new ScheduleResource($schedule);
    }

    /**
    * @OA\Delete(path="/api/schedule/{schedule}",
    *   tags={"Model: Schedule"},
    *   summary="Delete schedule",
    *   operationId="deleteSchedule",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of schedule",
    *       in="path",
    *       name="schedule",
    *       required=true,
    *       @OA\Schema(type="integer", format="int64")
    *   ),
    *   @OA\Response(
    *       response=204,
    *       description="Schedule deleted",
    *   )
    * )
    */
    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return response()->json(null, 204);
    }
}
