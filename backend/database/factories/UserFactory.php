<?php

use App\Role;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'national_id' => (string) round(rand(11111111, 99999999)),
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
        'activation_token' => '',
        'birth_date' => $faker->dateTime('1990-01-01 00:00:00'),
        'phone_number' => $faker->phoneNumber(),
        'active' => true,
        'clan_id' => null,
    ];
});

$factory->state(App\User::class, 'as_admin', [])
        ->afterCreatingState(App\User::class, 'as_admin', function ($user, $faker) {
            $role = Role::where('name', 'admin')->first();
            $user->roles()->attach($role);
        });

$factory->state(App\User::class, 'as_instructor', [])
        ->afterCreatingState(App\User::class, 'as_instructor', function ($user, $faker) {
            $role = Role::where('name', 'instructor')->first();
            $user->roles()->attach($role);
        });

$factory->state(App\User::class, 'as_assistant', [])
        ->afterCreatingState(App\User::class, 'as_assistant', function ($user, $faker) {
            $role = Role::where('name', 'assistant')->first();
            $user->roles()->attach($role);
        });

$factory->state(App\User::class, 'as_student', [])
        ->afterCreatingState(App\User::class, 'as_student', function ($user, $faker) {
            $role = Role::where('name', 'student')->first();
            $user->roles()->attach($role);
        });
