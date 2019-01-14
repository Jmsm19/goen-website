<?php

namespace App\Http\Controllers;

use App\Price;
use App\Module;
use Illuminate\Http\Request;
use App\Http\Resources\ModuleResource;
use Illuminate\Support\Facades\Config;
use App\Http\Requests\ModuleStoreRequest;
use App\Http\Requests\ModuleUpdateRequest;
use App\Http\Requests\AvailableSectionsForModuleRequest;

class ModuleController extends Controller
{
    /**
     * Display a listing of the Module.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ModuleResource::collection(Module::all());
    }

    /**
     * Store a newly created Module in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
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

        $price = Price::firstOrCreate([
            'amount' => $request->price,
        ]);

        // Create Module
        $module = Module::create([
            'period_id' => $request->period_id,
            'name' => $request->name,
            'section' => $request->section,
            'price_id' => $price->id,
            'schedule_id' => $request->schedule_id,
        ]);

        return new ModuleResource($module);
    }

    /**
     * Display the specified Module.
     *
     * @param  Module  $module
     * @return \Illuminate\Http\Response
     */
    public function show(Module $module)
    {
        return new ModuleResource($module);
    }

    /**
     * Update the specified Module in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Module  $module
     * @return \Illuminate\Http\Response
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
     * Remove the specified Module from storage.
     *
     * @param  Module  $module
     * @return \Illuminate\Http\Response
     */
    public function destroy(Module $module)
    {
        $module->delete();
        return response()->json(null, 204);
    }

    /**
     * Remove the specified Module from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
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
                'modules_available' => $available_sections,
            ]
        ], 200);
    }
}
