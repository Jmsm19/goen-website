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
        $day = $this->faker->dayOfWeek;
        $from = $this->faker->time('H:i');
        $until = $this->faker->time('H:i');

        $schedule = Schedule::create([
            'day' => $day,
            'from' => $from,
            'until' => $until
            ]);

        $this->assertEquals(
            [$day, $from, $until],
            [$schedule->day, $schedule->from, $schedule->until]
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
