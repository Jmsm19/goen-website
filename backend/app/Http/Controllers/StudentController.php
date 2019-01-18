<?php

namespace App\Http\Controllers;

use App\Module;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * If possible, register student in module
     * @param \Illuminate\Http\Request $request
     * @param \App\Module $module
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request, Module $module)
    {
        $student = $request->user();

        if ($student->canRegisterIn($module)) {
            if ($student->isRegisteredInPeriodOf($module)) {
                return response()->json([
                    'error' => trans('messages.only_one_module_per_period')
                ], 400);
            } elseif ($student->isNotWithinRegistrationThresholdOf($module->period)) {
                return response()->json([
                    'error' => trans('messages.registration_outside_threshold')
                ], 400);
            }
            $student->registerIn($module);
            return response()->json([
                'message' => trans('messages.succesfully_registered')
            ], 200);
        } else {
            return response()->json([
                'error' => trans('messages.module_full_or_registered')
            ], 400);
        }
    }
}
