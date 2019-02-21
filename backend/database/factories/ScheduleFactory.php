<?php

use Faker\Generator as Faker;

$factory->define(App\Schedule::class, function (Faker $faker) {
    return [
        'day' => $faker->dayOfWeek(),
        'from' => $faker->time('H:i'),
        'until' => $faker->time('H:i')
    ];
});
