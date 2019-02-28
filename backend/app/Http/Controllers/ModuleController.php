<?php

namespace App\Http\Controllers;

use App\Price;
use App\Module;
use App\Setting;
use Illuminate\Http\Request;
use App\Http\Resources\ModuleResource;
use Illuminate\Support\Facades\Config;
use App\Http\Requests\ModuleStoreRequest;
use App\Http\Requests\ModuleUpdateRequest;
use App\Http\Resources\SimpleStudentResource;
use App\Http\Requests\AvailableSectionsForModuleRequest;

class ModuleController extends Controller
{
    /**
     * @OA\Get(path="/api/module",
     *   tags={"Model: Module"},
     *   summary="Display a listing of Grades",
     *   operationId="getAllGrades",
     *   security={
     *       {"Bearer": {}}
     *   },
     *
     *   @OA\Response(
     *       response=200,
     *       description="Modules found",
     *       @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/ModuleCollection"))
     *   )
     * )
     */
    public function index()
    {
        return ModuleResource::collection(Module::all());
    }

    /**
    * @OA\Post(path="/api/module",
    *   tags={"Model: Module"},
    *   summary="Store module",
    *   operationId="storeModule",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\RequestBody(
    *       required=true,
    *       @OA\JsonContent(ref="#/components/schemas/ModuleStoreRequest"),
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Returns created module",
    *       @OA\JsonContent(ref="#/components/schemas/SingleModule")
    *   ),
    *   @OA\Response(
    *       response=400,
    *       description="Module already exists",
    *       @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
    *   )
    * )
    */
    public function store(ModuleStoreRequest $request)
    {
        // Check for similar Modules on the Period
        $module = Module::where([
            'period_id' => $request->period_id,
            'name' =>  $request->name,
            'section' => $request->section,
        ])->count();
        // If exists
        if ($module > 0) {
            return response()->json([
                'error' => trans('messages.module_exists')
            ], 400);
        }

        $settings = Setting::first();
        // Check Module number to set price based on the Institution's Settings
        preg_match('!\d+!', $request->name, $match);
        $module_number = (Integer) $match[0];

        if ($module_number == 0) {
            $price = Price::findOrFail($settings->intro_module_price_id);
        } elseif ($module_number <= 4) {
            $price = Price::findOrFail($settings->basic_modules_price_id);
        } elseif ($module_number <= 12) {
            $price = Price::findOrFail($settings->intermediate_modules_price_id);
        } elseif ($module_number <= 16) {
            $price = Price::findOrFail($settings->advance_modules_price_id);
        } else {
            $price = Price::findOrFail($settings->other_activities_price_id);
        }

        // Create Module
        $module = Module::create([
            'period_id' => $request->period_id,
            'name' => $request->name,
            'section' => $request->section,
            'price_id' => $price->id,
            'clan_id' => $request->name == 'M-0' ? $request->clan_id : null,
            'schedule_id' => $request->schedule_id,
        ]);

        return new ModuleResource($module);
    }

    /**
    * @OA\Get(path="/api/module/{module}",
    *   tags={"Model: Module"},
    *   summary="Get a Module by Id",
    *   operationId="getModuleById",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of module",
    *       in="path",
    *       name="module",
    *       required=true,
    *       @OA\Schema(type="integer", format="int64")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Module found",
    *       @OA\JsonContent(ref="#/components/schemas/SingleModule")
    *   )
    * )
    */
    public function show(Module $module)
    {
        return new ModuleResource($module);
    }

    /**
    * @OA\Put(path="/api/module/{module}",
    *   tags={"Model: Module"},
    *   summary="Update module data",
    *   operationId="updateModule",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of module",
    *       in="path",
    *       name="module",
    *       required=true,
    *       @OA\Schema(type="integer",format="int64")
    *   ),
    *   @OA\RequestBody(
    *       required=true,
    *       @OA\JsonContent(ref="#/components/schemas/ModuleUpdateRequest"),
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Returns updated module",
    *       @OA\JsonContent(ref="#/components/schemas/SingleModule")
    *   )
    * )
    */
    public function update(ModuleUpdateRequest $request, Module $module)
    {
        $section = null;

        $price = Price::firstOrCreate([
            'amount' => $request->price ?: $module->price->amount,
        ]);

        $module->update([
         'period_id' => $request->period_id ?: $module->period_id,
         'name' => $request->name ?: $module->name,
         'section' => $request->section ?: $module->section,
         'price_id' => $price->id ?: $module->price->id,
         'schedule_id' => $request->schedule_id ?: $module->schedule->id
        ]);

        return new ModuleResource($module);
    }

    /**
    * @OA\Delete(path="/api/module/{module}",
    *   tags={"Model: Module"},
    *   summary="Delete module",
    *   operationId="deleteModule",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of module",
    *       in="path",
    *       name="module",
    *       required=true,
    *       @OA\Schema(type="integer", format="int64")
    *   ),
    *   @OA\Response(
    *       response=204,
    *       description="Module deleted",
    *   )
    * )
    */
    public function destroy(Module $module)
    {
        $module->delete();
        return response()->json(null, 204);
    }

    /**
     * @OA\Get(path="/api/period/{period_id}/module/{name}/sections/available'",
     *   tags={"Model: Module"},
     *   summary="Display a listing of Grades",
     *   operationId="getAvailableSectionsForPeriodModule",
     *   security={
     *       {"Bearer": {}}
     *   },
     *
     *   @OA\Parameter(
     *       description="Id of Period",
     *       in="path",
     *       name="period_id",
     *       required=true,
     *       @OA\Schema(type="integer", format="int64")
     *   ),
     *   @OA\Parameter(
     *       description="Module name",
     *       in="path",
     *       name="name",
     *       required=true,
     *       @OA\Schema(type="string")
     *   ),
     *   @OA\Response(
     *       response=200,
     *       description="Returns an array of the sections available for Module creation",
     *       @OA\JsonContent(ref="#/components/schemas/AvailableSections")
     *   )
     * )
     */
    public function availableSectionsFor($period_id, $name)
    {
        $sections = Config::get('constants.section_letters');

        $module = Module::where([
            'name' => $name,
            'period_id' => $period_id,
        ])->get();

        $existing_sections = [];

        for ($i=0; $i < count($module); $i++) {
            array_push($existing_sections, $module[$i]->section);
        }

        $available_sections = array_diff($sections, $existing_sections);

        return response()->json([
            'data' => [
                'available_sections' => array_values($available_sections)
            ]
        ], 200);
    }

    public function students(Module $module)
    {
        return SimpleStudentResource::collection($module->students);
    }
}
