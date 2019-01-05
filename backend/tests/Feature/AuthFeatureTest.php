<?php

namespace Tests\Feature;

use App\Role;
use App\User;
use Tests\TestCase;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthFeatureTest extends TestCase
{
    /**
     * Test successful user signup and activation
     *
     * @return void
     */
    public function testSignupSuccess()
    {
        $new_user_data = [
            'name' => $this->faker->name,
            'national_id' => $this->faker->ean8,
            'email' => $this->faker->unique()->safeEmail,
            'password' => '1234567',
            'password_confirmation' => '1234567',
            'phone_number' => $this->faker->phoneNumber(),
            'birth_date' => '1999-01-09',
        ];

        $this->json('POST', route('signup'), $new_user_data, $this->headers)
            ->assertStatus(201)
            ->assertJson([
                'message' => trans('auth.successful_signup'),
            ]);
    }

    /**
     * Test successful user activation after signup
     *
     * @return void
     */
    public function testUserActivationAfterSignupSuccess()
    {
        $activation_token = str_random(60);

        $user = factory(User::class)->create([
            'active' => false,
            'activation_token' => $activation_token
        ]);

        $this->get(route('signup_activate', ['token' => $activation_token]))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id', 'name', 'email', 'national_id',
                    'phone_number', 'birth_date', 'clan',
                    'is_admin', 'is_instructor',
                    'is_student', 'is_assistant'
                ]
            ]);
    }

    /**
     * Test Failed user activation after signup
     *
     * @return void
     */
    public function testUserActivationAfterSignupFail()
    {
        $invalid_token = 'invalid token';
        $activation_token = str_random(60);

        $user = factory(User::class)->create([
            'active' => false,
            'activation_token' => $activation_token
        ]);

        $this->get(route('signup_activate', ['token' => $invalid_token]))
            ->assertStatus(404)
            ->assertJson([
                'message' => trans('auth.invalid_active_token')
            ]);
    }

    /**
     * Test user successful Login
     *
     * @return void
     */
    public function testLoginSuccess()
    {
        $login_data = [
            'email' => 'jorgemsm19@gmail.com',
            'password' => '20689293',
            'remember_me' => true
        ];

        $this->json('POST', route('login'), $login_data, $this->headers)
            ->assertStatus(200)
            ->assertJsonStructure([
                'access_token', 'token_type', 'expires_at'
            ]);
    }

    /**
     * Test user failed Login
     *
     * @return void
     */
    public function testLoginFail()
    {
        $login_data = [
            'email' => 'fakemail@gmail.com',
            'password' => '1234567'
        ];

        $this->json('POST', route('login'), $login_data, $this->headers)
            ->assertStatus(401)
            ->assertJson([
                'message' => trans('auth.failed')
            ]);
    }

    /**
     * Test getting authenticated user
     *
     * @return void
     */
    public function testGetAuthenticatedUserSuccess()
    {
        $this->passportActingAs('admin');

        $this->get(route('get_auth_user'))
            ->assertJsonStructure([
                'data' => [
                    'id', 'name', 'email', 'national_id',
                    'phone_number', 'birth_date', 'clan',
                    'is_admin', 'is_instructor',
                    'is_student', 'is_assistant'
                ]
            ]);
    }

    /**
     * Test faile to get authenticated user because not logged in
     *
     * @return void
     */
    public function testGetAuthenticatedUserFail()
    {
        $this->followingRedirects()
            ->get(route('get_auth_user'))
            ->assertJson([
                'message' => trans('auth.unauthenticated')
            ]);
    }

    /**
     * Test user Logout
     *
     * @return void
     */
    public function testLogout()
    {
        $this->passportActingAs('admin');

        $this->get(route('logout'))
            ->assertStatus(200)
            ->assertJson([
                'message' => trans('auth.logout')
            ]);
    }

    /**
     * Test correct response when accessing auth routes without being logged in
     *
     * @return void
     */
    public function testUnauthorizedAccess()
    {
        $this->followingRedirects()
            ->get(route('get_auth_user'))
            ->assertStatus(401)
            ->assertJson([
                'message' => trans('auth.unauthenticated'),
            ]);
    }
}
