<?php

namespace App\Http\Controllers;

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

        // Create Module
        $section = $module_sections[$next_section_index];
        $module = Module::create([
            'period_id' => $request->period_id,
            // Name is based on module section order from config
            'name' => "$request->name $section",
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
        $module->update($request->only(['period_id', 'name', 'schedule_id']));
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
