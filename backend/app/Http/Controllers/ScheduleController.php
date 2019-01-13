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
     * Display a listing of the Schedule.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ScheduleResource::collection(Schedule::all());
    }

    /**
     * Store a newly created Schedule in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
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
     * Display the specified Schedule.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Schedule $schedule)
    {
        return new ScheduleResource($schedule);
    }

    /**
     * Update the specified Schedule in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ScheduleUpdateRequest $request, Schedule $schedule)
    {
        $schedule->update($request->only(['start_date', 'from', 'until']));
        return new ScheduleResource($schedule);
    }

    /**
     * Remove the specified Schedule from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return response()->json(null, 204);
    }
}
