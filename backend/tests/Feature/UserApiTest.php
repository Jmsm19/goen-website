<?php

namespace Tests\Feature;

use App\Role;
use App\User;
use App\Module;
use App\Period;
use Carbon\Carbon;
use Tests\TestCase;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserApitest extends TestCase
{
    private $userJsonStructure = [
        'id', 'name', 'email', 'nationalId',
        'phoneNumber', 'birthDate', 'clan',
        'registrationStatus',
        'currentModule', 'previousModules',
        'isAdmin', 'isInstructor',
        'isStudent', 'isAssistant'
    ];

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
                    $this->userJsonStructure
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
        $period = Period::where('active', 1)->first();
        $module = factory(Module::class)->create(['period_id' => $period->id]);
        $user->registerIn($module);

        $current_module = $user->getCurrentModule();
        $previous_modules = $user->getPreviousModules();

        $this->get(route('user.show', ['user' => $user->id]))
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $user->id,
                    'nationalId' => $user->national_id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phoneNumber' => $user->phone_number,
                    'birthDate' => (string) $user->birth_date,
                    'registrationStatus' => $user->registration_status,
                    'currentModule' => [
                        'id' => $module->id,
                        'name' => $module->name,
                        'section' => $module->section,
                    ],
                    'previousModules' => [],
                    'isAdmin' => $user->hasRole('admin'),
                    'isInstructor' => $user->hasRole('instructor'),
                    'isStudent' => $user->hasRole('student'),
                    'isAssistant' => $user->hasRole('assistant')
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
                    'phoneNumber' => $params['phone_number'],
                    'birthDate' => $params['birth_date'],
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
                    'phoneNumber' => $params['phone_number'],
                    'birthDate' => $params['birth_date'],
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
