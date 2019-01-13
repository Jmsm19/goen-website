<?php

namespace Tests\Unit;

use id;
use App\Module;
use App\Schedule;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ScheduleUnitTest extends TestCase
{
    /**
     * Test can create Clan
     *
     * @return void
     */
    public function testCanCreateSchedule()
    {
        $start_date = $this->faker->date('Y-m-d');
        $from = $this->faker->time('H:i');
        $until = $this->faker->time('H:i');

        $schedule = Schedule::create([
            'start_date' => $start_date,
            'from' => $from,
            'until' => $until
            ]);

        $this->assertEquals(
            [$start_date, $from, $until],
            [$schedule->start_date, $schedule->from, $schedule->until]
        );
    }

    /**
     * Test Clan relationship with Users
     *
     * @return void
     */
    public function testScheduleModuleRelationship()
    {
        $schedule = factory(Schedule::class)->create();
        $module = factory(Module::class)->create([
            'schedule_id' => $schedule->id
        ]);

        $this->assertEquals(
            $schedule->modules[0]->id,
            $module->schedule->id
        );
    }
}
