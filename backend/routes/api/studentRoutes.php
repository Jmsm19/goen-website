<?php

Route::group(['middleware' => ['auth:api', 'role:student admin']], function () {
    Route::post(
        '/module/{module}/register',
        'StudentController@register'
    )->name('student.registration');
});
