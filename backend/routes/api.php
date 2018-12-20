<?php

use Illuminate\Http\Request;

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/', function () {
    $data = [
        'greeting' => 'Hello from the API',
    ];

    return response()->json($data, 200);
});


Route::group(['middleware' => ['auth:api', 'role:admin']], function () {
    // Attach new role to User
    Route::put('/users/{id}/{role}', 'RolesController@addRole');
    // Delete new role to User
    Route::delete('/users/{id}/{role}', 'RolesController@removeRole');
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::get('signup/activate/{token}', 'AuthController@signupActivate');
    Route::get('/unauthorized', 'AuthController@unauthorized')
        ->name('unauthorized');

    Route::group(['middleware' => ['auth:api']], function () {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});
