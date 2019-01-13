<?php

use Faker\Generator as Faker;

$factory->define(App\Schedule::class, function (Faker $faker) {
    return [
        'start_date' => $faker->date('Y-m-d'),
        'from' => $faker->time('H:i'),
        'until' => $faker->time('H:i')
    ];
});
