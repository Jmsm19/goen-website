<?php

namespace Tests\Feature;

use App\Period;
use Carbon\Carbon;
use Tests\TestCase;
use Illuminate\Support\Facades\Config;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PeriodApiTest extends TestCase
{
    /**
     * Test get period list
     *
     * @return void
     */
    public function testPeriodGetList()
    {
        $this->passportActingAs('admin');

        $this->get(route('period.index'))
            ->assertStatus(200)
            ->assertJsonStructure(['data' => []]);
    }

    /**
     * Test error to get period list because unauthorized user
     *
     * @return void
     */
    public function testPeriodGetListNoAuth()
    {
        $this->passportActingAs('student');

        $this->get(route('period.index'))
            ->assertStatus(403)
            ->assertJson([
                'error' => trans('auth.no_privilages')
            ]);
    }

    /**
     * Test create new period
     *
     * @return void
     */
    public function testPeriodStore()
    {
        $this->passportActingAs('admin');

        $signup_from = $this->faker->date('Y-m-d');
        $signup_until = Carbon::parse($signup_from)->addWeeks(2)->format('Y-m-d');

        // No params period creation
        $this->json(
            'POST',
            route('period.store'),
            ['signup_from' => $signup_from, 'signup_until' => $signup_until ]
            )
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'year',
                    'name',
                    'active',
                    'signupFrom',
                    'signupUntil',
                    'modules' => []
                ]
            ]);

        // Only one active period after period creation
        $active_period = Period::where('active', true)->get();
        $this->assertEquals(1, count($active_period));

        // Custom year period creation
        $year = Carbon::now()->year + 10;

        $correct_params = [
            'year' => $year,
            'signup_from' => $signup_from,
            'signup_until' => $signup_until
        ];

        $this->json('POST', route('period.store'), $correct_params)
            ->assertStatus(201)
            ->assertJson([
                'data' => [
                    'year' => $year,
                ]
            ]);

        // Failed period creation, invalid argument
        $this->json(
            'POST',
            route('period.store'),
            ['year' => -1999, 'signup_from' => 9999, 'signup_until' => 9999]
        )
        ->assertStatus(422)
        ->assertJsonValidationErrors([
            'year', 'signup_from', 'signup_until'
        ]);

        // Period creation yearly limit reached
        /*
        * Next year to prevent current year's database limit check
        * and start from 0
        */
        $year = Carbon::now()->year + 1;
        $period_limit = count(Config::get('constants.period_order'));
        factory(Period::class, $period_limit)->create(['year' => $year]);
        $this->json(
            'POST',
            route('period.store'),
            ['year' => $year,
            'signup_from' => $signup_from,
            'signup_until' => $signup_until]
        )
        ->assertStatus(400)
        ->assertJson([
            'error' => trans('messages.period_limit_reached')
        ]);
    }

    /**
     * Test get specified period
     *
     * @return void
     */
    public function testPeriodShow()
    {
        $this->passportActingAs('admin');
        $period = factory(Period::class)->create();

        // Successfully Get period
        $this->get(route('period.show', ['period' => $period->id]))
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $period->id,
                    'year' => $period->year,
                    'name' => $period->name,
                    'active' => $period->active,
                    'signupFrom' => $period->signup_from,
                    'signupUntil' => $period->signup_until,
                    'modules' => $period->modules
                ]
            ]);

        // Failed to Get period
        $this->get(route('period.show', ['period' => 9999]))
            ->assertStatus(404)
            ->assertJson([
                'error' => trans('messages.resource_not_found')
            ]);
    }

    /**
    * Test update period
    *
    * @return void
    */
    public function testPeriodUpdate()
    {
        $this->passportActingAs('admin');
        $period = factory(Period::class)->create();
        $signup_from = $this->faker->date('Y-m-d');
        $signup_until = Carbon::parse($signup_from)->addWeeks(2)->format('Y-m-d');

        // Successful period update
        $params = [
            'name' => 'New name',
            'year' => 1234,
            'signup_from' => $signup_from,
            'signup_until' => $signup_until,
        ];
        $this->put(route('period.update', ['period' => $period->id]), $params)
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $period->id,
                    'year' => $params['year'],
                    'name' => $params['name'],
                    'active' => $period->active,
                    'signupFrom' => $params['signup_from'],
                    'signupUntil' =>$params['signup_until'],
                    'modules' => $period->modules
                ]
            ]);

        // Failed period update, invalid argument
        $period = factory(Period::class)->create();
        $params = [
            'name' => 1,
            'year' => -2018,
            'signup_from' => 999,
             'signup_until' => 999
        ];
        $this->json(
            'PUT',
            route('period.update', ['period' => $period->id]),
            $params,
            $this->headers
        )
        ->assertStatus(422)
        ->assertJsonValidationErrors([
            'name', 'year', 'signup_from', 'signup_until'
        ]);
    }

    /**
     * Test delete period
     *
     * @return void
     */
    public function testPeriodDelete()
    {
        $this->passportActingAs('admin');
        $period = factory(Period::class)->create();

        $this->delete(route('period.destroy', ['period' => $period->id]))
            ->assertStatus(204);
    }

    /**
     * Test get period by year
     *
     * @return void
     */
    public function testPeriodGetByYear()
    {
        $this->passportActingAs('admin');

        $this->get(route('period.year'))
            ->assertStatus(200)
            ->assertJsonStructure(['data' => []]);

        $this->get(route('period.year', ['year' => 1800]))
            ->assertStatus(200)
            ->assertJsonStructure(['data' => []]);
    }

    /**
     * Test get current active period
     *
     * @return void
     */
    public function testPeriodGetCurrent()
    {
        $this->get(route('period.current'))
            ->assertStatus(200)
            ->assertJsonStructure(['data' => [
                'id',
                'year',
                'name',
                'active',
                'signupFrom',
                'signupUntil',
                'modules' => []
            ]]);
    }
}
