<?php

// Get current active period
Route::get('/period/current', 'PeriodController@current')
    ->name(('period.current'));

// Get global settings
Route::get('/setting', 'SettingController@all')
    ->name('setting.all');
