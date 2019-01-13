<?php

use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(App\Period::class, function (Faker $faker) {
    $signup_from = $this->faker->date('Y-m-d');

    return [
        'name' => $faker->word,
        'year' => $faker->date('Y'),
        'active' => true,
        'signup_from' => $signup_from,
        'signup_until' => Carbon::parse($signup_from)->addWeeks(2)->format('Y-m-d')
    ];
});
