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

        $period = Period::create([
            'year' => $year,
            'name' => $name,
        ]);

        $this->assertEquals([$name, $year], [$period->name, $period->year]);
    }

    /**
     * Test Period relationship with Modules
     *
     * @return void
     */
    public function testPeriodModulesRelationship()
    {
        $year = 2018;
        $period_name = 'I';
        $module_name = 'Module Name';

        $period = Period::create([
            'year' => $year,
            'name' => $period_name,
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
            [$period->year, $period->name, $period->module[0]->name]
        );
    }
}
