<?php

namespace App\Http\Controllers;

use App\Price;
use App\Module;
use Illuminate\Http\Request;
use App\Http\Resources\ModuleResource;
use Illuminate\Support\Facades\Config;
use App\Http\Requests\ModuleStoreRequest;
use App\Http\Requests\ModuleUpdateRequest;

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
        $module_sections = Config::get('constants.module_section_order');
        // Look for all similarly named Modules on target period
        $same_level_modules = Module::where('period_id', $request->period_id)                     ->where('name', 'like', "$request->name %")->get();

        // Send response if there are already too many similarly named Modules
        $next_section_index = count($same_level_modules) + 1;
        if ($next_section_index > count($module_sections)) {
            return response()->json([
                'error' => trans('messages.section_limit_reached')
            ], 400);
        }

        $price = Price::firstOrCreate([
            'amount' => $request->price,
        ]);

        // Create Module
        $section = $module_sections[$next_section_index];
        $module = Module::create([
            'period_id' => $request->period_id,
            // Name is based on module section order from config
            'name' => "$request->name $section",
            'price_id' => $price->id,
            'schedule_id' => $request->schedule_id,
        ]);

        return new ModuleResource($module);
    }

    /**
     * Display the specified Module.
     *
     * @param  int  $id
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ModuleUpdateRequest $request, Module $module)
    {
        $price = Price::firstOrCreate([
            'amount' => $request->price ?: $module->price->amount,
        ]);

        $module->update([
         'period_id' => $request->period_id ?: $module->period_id,
         'name' => $request->name ?: $module->name,
         'price_id' => $price->id ?: $module->price->id,
         'schedule_id' => $request->schedule_id ?: $module->schedule->id
        ]);

        return new ModuleResource($module);
    }

    /**
     * Remove the specified Module from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Module $module)
    {
        $module->delete();
        return response()->json(null, 204);
    }
}
