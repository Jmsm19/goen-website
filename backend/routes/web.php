<?php

Route::any('/{anything?}', function () {
    $data = [
        'error' => trans('auth.login_first'),
    ];

    return response()->json($data, 404);
});
