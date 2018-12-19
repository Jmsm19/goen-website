<?php

Route::any('/{anything?}', function () {
    $data = [
        'error' => 'Invalid route',
    ];

    return response()->json($data, 404);
});
