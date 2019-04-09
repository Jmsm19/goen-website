<?php

use App\User;
use App\Module;
use Faker\Generator as Faker;

$factory->define(App\Grade::class, function (Faker $faker) {
    $module = factory(Module::class)->create();
    $user = factory(User::class)->create();

    return [
        'score' => rand(0, 100),
        'module_id' => $module->id,
        'user_id' => $user->id,
    ];
});
