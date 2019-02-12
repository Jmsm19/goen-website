<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InstitutionController extends Controller
{
    public function all()
    {
        return Settings::firstOrFail();
    }

    public function update($request)
    {
        $settings = Settings::firstOrFail();
        $settings->update($request->all());
        return $settings;
    }
}
