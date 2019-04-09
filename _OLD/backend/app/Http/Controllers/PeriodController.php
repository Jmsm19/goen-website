<?php

namespace App\Http\Controllers;

use App\User;
use App\Period;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\PeriodResource;
use Illuminate\Support\Facades\Config;
use App\Http\Requests\PeriodStoreRequest;
use App\Http\Requests\PeriodUpdateRequest;
use App\Http\Resources\SimplePeriodResource;
use App\Http\Resources\SimpleStudentResource;
use App\Http\Resources\PeriodWithStudentsResource;
use App\Http\Resources\SimpleStudentWithCurrentModuleResource;

class PeriodController extends Controller
{
    /**
    * @OA\Get(path="/api/period",
    *   tags={"Model: Period"},
    *   summary="Display a listing of Periods",
    *   operationId="getAllPeriods",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Response(
    *       response=200,
    *       description="Periods found",
    *       @OA\JsonContent(
    *           type="array",
    *           @OA\Items(ref="#/components/schemas/PeriodCollection")
    *        )
    *      )
    *   )
    * )
    */
    public function index()
    {
        return PeriodResource::collection(Period::orderBy('created_at', 'desc')->get());
    }

    /**
    * @OA\Post(path="/api/period",
    *   tags={"Model: Period"},
    *   summary="Store period",
    *   operationId="storePeriod",
    *   security={
    *       {"Bearer": {}}
    *   },
    *   @OA\RequestBody(
    *       required=true,
    *       @OA\JsonContent(ref="#/components/schemas/PeriodStoreRequest"),
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Returns created period",
    *       @OA\JsonContent(ref="#/components/schemas/SinglePeriod")
    *   ),
    *   @OA\Response(
    *       response=400,
    *       description="Period limit reached for the year.",
    *       @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
    *   )
    * )
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
        if ($request->make_current) {
            $previous_active_period = Period::where('active', 1);
            if (!empty($previous_active_period)) {
                $previous_active_period->update(['active' => false]);
            }
        }

        // Create period with correct name based on period order
        $name = $period_order[$next_period_index];
        $period = Period::create([
            'name' => $name,
            'year' => $year,
            // The new period is now the current period (active period)
            'active' => $request->make_current ?: false,
            'signup_from' => $request->signup_from,
            'signup_until' => $request->signup_until
        ]);

        return new PeriodResource($period);
    }

    /**
    * @OA\Get(path="/api/period/{period}",
    *   tags={"Model: Period"},
    *   summary="Get a Period by Id",
    *   operationId="getPeriodById",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of period",
    *       in="path",
    *       name="period",
    *       required=true,
    *       @OA\Schema(format="int64", type="integer")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Period found",
    *       @OA\JsonContent(ref="#/components/schemas/SinglePeriod")
    *   )
    * )
    */
    public function show(Period $period)
    {
        return new PeriodResource($period);
    }

    /**
    * @OA\Put(path="/api/period/{period}",
    *   tags={"Model: Period"},
    *   summary="Update period data",
    *   operationId="updatePeriod",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of period",
    *       in="path",
    *       name="period",
    *       required=true,
    *       @OA\Schema(format="int64", type="integer")
    *   ),
    *   @OA\RequestBody(
    *       required=true,
    *       @OA\JsonContent(ref="#/components/schemas/PeriodUpdateRequest"),
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Returns updated Period",
    *       @OA\JsonContent(ref="#/components/schemas/SinglePeriod")
    *   )
    * )
    */
    public function update(PeriodUpdateRequest $request, Period $period)
    {
        $period->update($request->only(['name', 'year', 'signup_from', 'signup_until']));
        return new PeriodResource($period);
    }

    /**
    * @OA\Delete(path="/api/period/{period}",
    *   tags={"Model: Period"},
    *   summary="Delete period",
    *   operationId="deletePeriod",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of period",
    *       in="path",
    *       name="period",
    *       required=true,
    *       @OA\Schema(type="integer", format="int64")
    *   ),
    *   @OA\Response(
    *       response=204,
    *       description="Period deleted",
    *   )
    * )
    */
    public function destroy(Period $period)
    {
        if ($period->active) {
            return response()->json([
                'error' => trans('message.CannotDeleteActivePeriod')
            ], 403);
        }

        $period->delete();
        return response()->json(null, 204);
    }

    /**
    * @OA\Get(path="/api/period/current",
    *   tags={"Model: Period"},
    *   summary="Get active Period",
    *   description="",
    *   operationId="getCurrentPeriod",
    *
    *   @OA\Response(
    *       response=200,
    *       description="Period found",
    *       @OA\JsonContent(ref="#/components/schemas/SinglePeriod")
    *       ),
    *   ),
    *   @OA\Response(
    *       response=404,
    *       description="Period not found",
    *       @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
    *   )
    * )
    */
    public function current()
    {
        $period = Period::where('active', true)->firstOrFail();

        return new PeriodResource($period);
    }

    /**
    * @OA\Get(path="/api/period/year/{year}",
    *   tags={"Model: Period"},
    *   summary="Get all data for the current year's or the given year's periods",
    *   operationId="getPeriodByYear",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Year of the period to fetch",
    *       in="path",
    *       name="year",
    *       required=false,
    *       allowEmptyValue=true,
    *       @OA\Schema(
    *           format="date",
    *           type="integer"
    *       )
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Period found",
    *       @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/SinglePeriod"))
    *   ),
    * )
    */
    public function year($year = null)
    {
        $target_year = is_null($year) ?
                Carbon::now()->year : $year;

        return PeriodResource::collection(
            Period::where('year', $target_year)->get()
        );
    }

    /**
    * @OA\Get(path="/api/period/current/students",
    *   tags={"Model: Period"},
    *   summary="Get students of current active Period",
    *   operationId="getStudentsOfCurrentPeriod",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Response(
    *       response=200,
    *       description="Period and students found",
    *       @OA\JsonContent(ref="#/components/schemas/CurrentPeriodStudents")
    *   ),
    * )
    */
    public function currentPeriodStudents()
    {
        $period = Period::where('active', true)->first();

        $students = User::with(['modulesAsStudent.period' => function ($query) {
            $query->where('active', 1);
        }])->get()->filter(function ($user) {
            $periods = [];
            foreach ($user->modulesAsStudent as $module) {
                if (!is_null($module->period)) {
                    array_push($periods, $module->period);
                }
            }
            return count($periods) > 0;
        });

        return response()->json([
            'data' => [
                'period' => new SimplePeriodResource($period),
                'students' => SimpleStudentWithCurrentModuleResource::collection($students)
            ]
        ], 200);
    }

    /**
    * @OA\Post(path="/api/period/{period}/make-current",
    *   tags={"Model: Period"},
    *   summary="Make period the current active one",
    *   operationId="makePeriodCurrent",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Response(
    *       response=200,
    *       description="Period and students found",
    *       @OA\JsonContent(ref="#/components/schemas/SinglePeriod")
    *   ),
    * )
    */
    public function makeCurrent(Period $period)
    {
        $period->makeCurrent();
        return new PeriodResource($period);
    }
}
