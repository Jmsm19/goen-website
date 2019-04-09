<?php

// Authentication related routes
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login')->name('login');
    Route::post('signup', 'AuthController@signup')->name('signup');
    Route::get('signup/activate/{token}', 'AuthController@signupActivate')
        ->name('signup_activate');

    Route::group(['middleware' => ['auth:api']], function () {
        Route::get('logout', 'AuthController@logout')->name('logout');
        Route::get('user', 'AuthController@user')->name('get_auth_user');
    });
});

// Routes that only require Authentication
Route::group(['middleware' => ['auth:api']], function () {
    Route::put('/user/{user}', 'UserController@update')->name('user.update');
});
