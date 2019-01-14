<?php

use App\Price;
use App\Period;
use App\Schedule;
use Faker\Generator as Faker;

$factory->define(App\Module::class, function (Faker $faker) {
    $first_period_available = Period::all()->first();
    $period = is_null($first_period_available) ?
        factory(Period::class)->create() : $first_period_available;

    $price = Price::firstOrCreate([
        'amount' => $faker->randomFloat(2, 1000)
    ]);
    $schedule = factory(Schedule::class)->create();

    return [
        'name' => $faker->word,
        'section' => strtoupper($faker->randomLetter),
        'period_id' => $period->id,
        'price_id' => $price->id,
        'schedule_id' => $schedule->id,
    ];
});
