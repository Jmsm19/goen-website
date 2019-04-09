<?php

namespace Tests;

use App\Role;
use App\User;
use Faker\Factory as Faker;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, DatabaseMigrations, DatabaseTransactions;

    protected $faker;
    protected $headers;
    protected function passportActingAs($role = 'student')
    {
        $user = factory(User::class)->state("as_{$role}")->create();
        return Passport::actingAs($user);
    }

    protected function setUp()
    {
        parent::setUp();
        Artisan::call('db:seed');
        Artisan::call('passport:install');
        $this->faker = Faker::create();
        $this->headers = [
            'HTTP_X-Requested-With' => 'XMLHttpRequest',
            'HTTP_Content-Type' => 'application/json',
        ];
    }

    /**
     * Reset the migrations
     */
    protected function tearDown()
    {
        Artisan::call('migrate:reset');
        parent::tearDown();
    }
}
