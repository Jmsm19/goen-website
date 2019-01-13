<?php

namespace Tests\Feature;

use App\Schedule;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ScheduleApiTest extends TestCase
{
    /**
     * Test get list of Schedules
     *
     * @return void
     */
    public function testGetAllSchedules()
    {
        $this->passportActingAs('admin');

        $this->get(route('schedule.index'))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    [
                        'id', 'start_date', 'from', 'until'
                    ]
                ]
            ]);
    }

    /**
     * Test get specified Schedule
     *
     * @return void
     */
    public function testGetSchedule()
    {
        $this->passportActingAs('admin');
        $schedule = factory(Schedule::class)->create();

        $this->get(route('schedule.show', ['schedule' => $schedule->id]))
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $schedule->id,
                    'start_date' => $schedule->start_date,
                    'from' => $schedule->from,
                    'until' => $schedule->until,
                ]
            ]);
    }

    /**
     * Test create new Schedule
     *
     * @return void
     */
    public function testScheduleStore()
    {
        $this->passportActingAs('admin');

        // Successful store
        $params = [
            'start_date' => $this->faker->date('Y-m-d'),
            'from' => $this->faker->time('H:i'),
            'until' => $this->faker->time('H:i')
        ];

        $this->json('POST', route('schedule.store'), $params)
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id', 'start_date', 'from', 'until'
                ]
            ]);

        // Failed store - Schedule already exists - using previous params
        $this->json('POST', route('schedule.store'), $params)
        ->assertStatus(400)
            ->assertJson([
                'error' => trans('messages.schedule_exists')
            ]);

        // Failed store - wrong params
        $params = [
            'start_date' => 999,
            'from' => 999,
            'until' => 999
        ];

        $this->json('POST', route('schedule.store'), $params)
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'start_date', 'from', 'until'
            ]);

        // Failed store - no params
        $this->json('POST', route('schedule.store'))
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'start_date', 'from', 'until'
            ]);
    }

    /**
     * Test update Schedule
     *
     * @return void
     */
    public function testScheduleUpdate()
    {
        $this->passportActingAs('admin');
        $schedule = factory(Schedule::class)->create();

        // Successful update
        $params = [
            'start_date' => $this->faker->date('Y-m-d'),
            'from' => $this->faker->time('H:i'),
            'until' => $this->faker->time('H:i')
        ];

        $this->json(
            'PUT',
            route('schedule.update', ['schedule' => $schedule->id]),
            $params,
            $this->headers
        )
        ->assertStatus(200)
        ->assertJson([
            'data' => [
                'start_date' => $params['start_date'],
                'from' => $params['from'],
                'until' => $params['until'],
            ]
        ]);

        // Failed update
        $params = [
            'start_date' => 999,
            'from' => 999,
            'until' => 999
        ];

        $this->json(
            'PUT',
            route('schedule.update', ['schedule' => $schedule->id]),
            $params,
            $this->headers
        )
        ->assertStatus(422)
        ->assertJsonValidationErrors([
            'start_date', 'from', 'until'
        ]);
    }

    /**
     * Test Schedule delete
     */
    public function testScheduleDelete()
    {
        $this->passportActingAs('admin');
        $schedule = factory(Schedule::class)->create();

        $this->delete(route('schedule.destroy', ['schedule' => $schedule->id]))
            ->assertStatus(204);
    }
}
