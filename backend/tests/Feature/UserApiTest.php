<?php

namespace Tests\Feature;

use App\Role;
use App\User;
use Carbon\Carbon;
use Tests\TestCase;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserApitest extends TestCase
{
    /**
     * Test get list of users
     *
     * @return void
     */
    public function testGetAllUsers()
    {
        $this->passportActingAs('admin');

        $this->get(route('user.index'))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    [
                        'id', 'name', 'email', 'national_id',
                        'phone_number', 'birth_date',
                        'is_admin', 'is_instructor',
                        'is_student', 'is_assistant'
                    ]
                ]
            ]);
    }

    /**
     * Test get single user
     *
     * @return void
     */
    public function testGetSingleUser()
    {
        $this->passportActingAs('admin');
        $user = factory(User::class)->state('as_student')->create();

        $this->get(route('user.show', ['user' => $user->id]))
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $user->id,
                    'national_id' => $user->national_id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone_number' => $user->phone_number,
                    'birth_date' => (string) $user->birth_date,
                    'is_admin' => $user->hasRole('admin'),
                    'is_instructor' => $user->hasRole('instructor'),
                    'is_student' => $user->hasRole('student'),
                    'is_assistant' => $user->hasRole('assistant')
                ]
            ]);
    }

    /**
     * Test update single user
     *
     * @return void
     */
    public function testCanUpdateUser()
    {
        // User can update own data
        $user = factory(User::class)->state('as_student')->create();
        Passport::actingAs($user);

        $params = [
            'name' => $this->faker->name,
            'phone_number' => $this->faker->phoneNumber(),
            'birth_date' => (string) Carbon::now()
        ];

        $this->put(route('user.update', ['user' => $user->id]), $params)
            ->assertStatus(200)
            ->assertJson([
               'data' => [
                    'name' => $params['name'],
                    'phone_number' => $params['phone_number'],
                    'birth_date' => $params['birth_date'],
               ]
            ]);

        // Admins can update user
        $this->passportActingAs('admin');
        $params = [
            'name' => $this->faker->name,
            'phone_number' => $this->faker->phoneNumber(),
            'birth_date' => (string) Carbon::now()->addYear(1)
        ];

        $this->put(route('user.update', ['user' => $user->id]), $params)
            ->assertStatus(200)
            ->assertJson([
               'data' => [
                    'name' => $params['name'],
                    'phone_number' => $params['phone_number'],
                    'birth_date' => $params['birth_date'],
               ]
            ]);

        // Error if not authorized
        $this->passportActingAs('instructor'); // other user
        $this->put(route('user.update', ['user' => $user->id]), $params)
            ->assertStatus(403)
            ->assertJson([
                'error' => trans('auth.no_privilages')
            ]);
    }

    /**
     * Test can't update single user with wrong params
     *
     * @return void
     */
    public function testUpdateUserError()
    {
        $this->passportActingAs('admin');
        $user = factory(User::class)->state('as_student')->create();

        $params = [
            'name' => 123465,
            'phone_number' => 123465,
            'birth_date' => 123456
        ];

        $this->json(
            'PUT',
            route('user.update', ['user' => $user->id]),
            $params,
            $this->headers
        )
        ->assertStatus(422)
        ->assertJsonValidationErrors([
            'name', 'phone_number', 'birth_date'
        ]);
    }

    /**
     * Test get single user
     *
     * @return void
     */
    public function testCanDestroyUser()
    {
        $this->passportActingAs('admin');
        $user = factory(User::class)->create();

        $this->delete(route('user.destroy', ['user' => $user->id]))
            ->assertStatus(204);

        $this->get(route('user.show', ['user' => $user->id]))
            ->assertStatus(404)
            ->assertJson([
                'error' => trans('messages.resource_not_found')
            ]);
    }
}
