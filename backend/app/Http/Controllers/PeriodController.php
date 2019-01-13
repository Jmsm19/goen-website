<?php

namespace App\Http\Controllers;

use App\Period;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\PeriodResource;
use Illuminate\Support\Facades\Config;
use App\Http\Requests\PeriodStoreRequest;
use App\Http\Requests\PeriodUpdateRequest;

class PeriodController extends Controller
{
    /**
     * Display a listing of Periods.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PeriodResource::collection(Period::all());
    }

    /**
     * Store a newly created Period in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PeriodStoreRequest $request)
    {
        // Get current year or take it from request
        $year = is_null($request->year) ?
                Carbon::now()->year : $request->year;

        // Create Period Name based on the Year's existant periods
        $period_order = Config::get('constants.period_order');
        $current_year_periods = Period::where('year', $year)->get();
        $next_period_index = count($current_year_periods) + 1;
        if ($next_period_index > count($period_order)) {
            return response()->json([
                'error' => trans('messages.period_limit_reached')
            ], 400);
        }

        // Current period(s) will be marked as inactive (false)
        $previous_active_period = Period::where('active', 1);
        if (!empty($previous_active_period)) {
            $previous_active_period->update(['active' => false]);
        }

        // Create period with correct name based on period order
        $name = $period_order[$next_period_index];
        $period = Period::create([
            'name' => $name,
            'year' => $year,
            // The new period is now the current period (active period)
            'active' => true,
            'signup_from' => $request->signup_from,
            'signup_until' => $request->signup_until
        ]);

        return new PeriodResource($period);
    }

    /**
     * Display the specified Period.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Period $period)
    {
        return new PeriodResource($period);
    }

    /**
     * Update the specified Period in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(PeriodUpdateRequest $request, Period $period)
    {
        $period->update($request->only(['name', 'year', 'signup_from', 'signup_until']));
        return new PeriodResource($period);
    }

    /**
     * Remove the specified Period from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Period $period)
    {
        $period->delete();
        return response()->json(null, 204);
    }

    /**
    * Get all data for the current active period
    *
    * @return \Illuminate\Http\Response
    */
    public function current()
    {
        return new PeriodResource(
            Period::where('active', true)->first()
        );
    }

    /**
    * Get all data for the current year's periods
    *
    * @param  date $year format(YYYY)
    * @return \Illuminate\Http\Response
    */
    public function year($year = null)
    {
        $target_year = is_null($year) ?
                Carbon::now()->year : $year;

        return PeriodResource::collection(
            Period::where('year', $target_year)->get()
        );
    }
}
