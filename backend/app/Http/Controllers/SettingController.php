<?php

namespace App\Http\Controllers;

use App\Setting;
use Illuminate\Http\Request;
use App\Http\Resources\SettingResource;

class SettingController extends Controller
{
    public function all()
    {
        return new SettingResource(Setting::firstOrFail());
    }

    public function update($request)
    {
        $settings = Setting::firstOrFail();
        $settings->update($request->all());
        return new SettingResource($settings);
    }
}
