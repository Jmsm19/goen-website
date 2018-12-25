<?php

use Illuminate\Http\Request;

Route::get('/', function () {
    $data = [
        'greeting' => 'Hello from the API',
    ];

    return response()->json($data, 200);
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('signup', 'AuthController@signup')->name('signup');
    Route::get('signup/activate/{token}', 'AuthController@signupActivate')
            ->name('signup_activate');
    Route::get('/unauthorized', 'AuthController@unauthorized')
        ->name('unauthorized');

    Route::group(['middleware' => ['auth:api']], function () {
        Route::get('logout', 'AuthController@logout')->name('logout');
        Route::get('user', 'AuthController@user')->name('get_auth_user');
    });
});

Route::group(['middleware' => ['auth:api', 'role:admin']], function () {
    // Attach new role to User
    Route::put('/users/{id}/{role}', 'RolesController@addRole')
        ->name('add_role');
    // Delete new role to User
    Route::delete('/users/{id}/{role}', 'RolesController@removeRole')
        ->name('remove_role');

    Route::apiResource('module', 'ModuleController');

    // Get current active period
    Route::get('/period/current', 'PeriodController@current')
        ->name(('period.current'));
    // Get specified (or current) year's periods
    Route::get('/period/year/{year?}', 'PeriodController@year')
        ->name('period.year');
    Route::apiResource('period', 'PeriodController');
});
