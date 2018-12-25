<?php

namespace Tests\Unit;

use App\Module;
use App\Period;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ModuleUnitTest extends TestCase
{
    /**
     * Test Module creation and relationship with Period
     *
     * @return void
     */
    public function testCanCreateModule()
    {
        $module_name = 'Module Test name';
        $period_name = 'Period Test name';
        $period_year = 2018;

        $period = Period::create([
            'name' => $period_name,
            'year' => $period_year
        ]);

        $module = Module::create([
            'name' => $module_name,
            'period_id' => $period->id
        ]);

        $expected = [
            $module_name,
            $period_name,
            $period_year
        ];

        $this->assertEquals($expected, [
            $module->name,
            $module->period->name,
            $module->period->year
        ]);
    }
}
