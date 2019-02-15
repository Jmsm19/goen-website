<?php

// Routes that require Authentication and Admin role
Route::group(['middleware' => ['auth:api', 'role:admin']], function () {
    // Attach new role to User
    Route::put('/users/{id}/{role}', 'RolesController@addRole')
        ->name('add_role');
    // Delete new role to User
    Route::delete('/users/{id}/{role}', 'RolesController@removeRole')
        ->name('remove_role');

    Route::apiResource('module', 'ModuleController');
    Route::get(
        '/module/availablesections/{period_id}/{name}',
        'ModuleController@availableSectionsFor'
    )->name('module.availablesections');

    // Get specified (or current) year's periods
    Route::get('/period/year/{year?}', 'PeriodController@year')
        ->name('period.year');
    Route::apiResource('period', 'PeriodController');

    // User Controller
    Route::get('/user', 'UserController@index')->name('user.index');
    Route::get('/user/{user}', 'UserController@show')->name('user.show');
    Route::delete('/user/{user}', 'UserController@destroy')->name('user.destroy');

    // Clan related routes
    Route::apiResource('clan', 'ClanController', [
        'except' => ['store']
    ]);

    // Schedule related routes
    Route::apiResource('schedule', 'ScheduleController');

    // Price related routes
    Route::apiResource('price', 'PriceController');

    // Period related routes
    Route::get('/period/current/students', 'PeriodController@currentPeriodStudents')
        ->name('current-period-students');
    Route::post('/period/{period}/make-current', 'PeriodController@makeCurrent')
        ->name('make-period-current');

    // Student releated routes
    Route::post('student/{student}/confirm-payment', 'StudentController@confirmPayment')
        ->name('confirm-student-payment');
    Route::post('student/{student}/reject-payment', 'StudentController@rejectPayment')
        ->name('reject-student-payment');

    // Instructor related routes
    Route::get('/instructor', 'InstructorController@index')
        ->name('instructor.index');
    Route::put('/instructor/add/{id}', 'InstructorController@addInstructorRole')
        ->name('instructor.add');

    // Global Settings routes
    Route::put('/setting', 'SettingController@update')
        ->name('setting.update');
});
