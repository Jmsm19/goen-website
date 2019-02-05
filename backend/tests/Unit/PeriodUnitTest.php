<?php

namespace Tests\Unit;

use App\Module;
use App\Period;
use Carbon\Carbon;
use Tests\TestCase;
use App\Http\Resources\ModuleResource;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PeriodUnitTest extends TestCase
{
    /**
     * Test Period creation
     *
     * @return void
     */
    public function testCanCreatePeriod()
    {
        $year = 2018;
        $name = 'I';
        $signup_from = $this->faker->date('Y-m-d');
        $signup_until = Carbon::parse($signup_from)->addWeeks(2)->format('Y-m-d');

        $period = Period::create([
            'year' => $year,
            'name' => $name,
            'signup_from' => $signup_from,
            'signup_until' => $signup_until
        ]);

        $this->assertEquals(
            [$name, $year, $signup_from, $signup_until ],
            [$period->name, $period->year, $period->signup_from, $period->signup_until]
        );
    }

    /**
     * Test Period relationship with Modules
     *
     * @return void
     */
    public function testPeriodModulesRelationship()
    {
        $year = 2018;
        $signup_from = $this->faker->date('Y-m-d');
        $signup_until = Carbon::parse($signup_from)->addWeeks(2)->format('Y-m-d');
        $period_name = 'I';
        $module_name = 'Module Name';

        $period = Period::create([
            'year' => $year,
            'name' => $period_name,
            'signup_from' => $signup_from,
            'signup_until' => $signup_until
        ]);

        $module = Module::create([
            'name' => $module_name,
            'period_id' => $period->id
        ]);

        $expected = [
            $year, $period_name, $module->name
        ];

        $this->assertEquals(
            $expected,
            [$period->year, $period->name, $period->modules[0]->name]
        );
    }
}
