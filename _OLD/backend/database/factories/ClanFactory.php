<?php

use Faker\Generator as Faker;

$factory->define(App\Clan::class, function (Faker $faker) {
    return [
        'name' => $faker->word,
        'picture' => $faker->url()
    ];
});
