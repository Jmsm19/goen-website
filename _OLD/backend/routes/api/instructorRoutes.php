<?php

// Routes that require Authentication and Instructor Role
Route::group(['middleware' => ['auth:api', 'role:instructor admin']], function () {
    // Grades related routes
    Route::apiResource('grade', 'GradeController');
});
