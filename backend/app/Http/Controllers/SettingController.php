<?php

namespace App\Http\Controllers;

use App\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function all()
    {
        return Setting::firstOrFail();
    }

    public function update($request)
    {
        $settings = Setting::firstOrFail();
        $settings->update($request->all());
        return $settings;
    }
}
