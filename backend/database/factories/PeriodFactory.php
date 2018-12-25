<?php

use Faker\Generator as Faker;

$factory->define(App\Period::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'year' => $faker->date('Y'),
        'active' => true
    ];
});
