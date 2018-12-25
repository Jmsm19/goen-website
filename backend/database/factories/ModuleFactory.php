<?php

use App\Period;
use Faker\Generator as Faker;

$factory->define(App\Module::class, function (Faker $faker) {
    $first_period_available = Period::all()->first();
    $period = is_null($first_period_available) ?
        factory(Period::class)->create() : $first_period_available;

    return [
        'name' => $faker->word,
        'period_id' => $period->id
    ];
});
