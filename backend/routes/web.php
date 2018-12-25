<?php

Route::any('/{anything?}', function () {
    $data = [
        'error' => trans('messages.route_not_found'),
    ];

    return response()->json($data, 404);
});
