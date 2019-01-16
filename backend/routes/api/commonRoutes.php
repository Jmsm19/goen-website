<?php

// Get current active period
Route::get('/period/current', 'PeriodController@current')
    ->name(('period.current'));
