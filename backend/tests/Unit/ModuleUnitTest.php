<?php

namespace Tests\Unit;

use App\Grade;
use App\Price;
use App\Module;
use App\Period;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ModuleUnitTest extends TestCase
{
    /**
     * Test Module relationship with Period
     *
     * @return void
     */
    public function testModulePeriodRelationship()
    {
        $module_name = 'Module Test name';
        $period_name = 'Period Test name';
        $period_year = 2018;

        $period = Period::create([
            'name' => $period_name,
            'year' => $period_year
        ]);

        $price = Price::firstOrCreate([
            'amount' => $this->faker->randomFloat(2, 1000)
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

    /**
     * Test Module relationship with Grade
     *
     * @return void
     */
    public function testModuleGradesRelationship()
    {
        $module = factory(Module::class)->create();

        $grade = factory(Grade::class)->create([
            'module_id' => $module->id
        ]);

        $expected = [
            $grade->score
        ];

        $this->assertEquals($expected, [
            $module->grades[0]->score
        ]);
    }

    /**
     * Test Module relationship with Price
     *
     * @return void
    */
    public function testModulePriceRelationship()
    {
        $price = Price::create([
            'amount' => 99999
        ]);
        $module = factory(Module::class)->create([
            'price_id' => $price->id,
        ]);

        $this->assertEquals(
            [$price->id, $price->amount],
            [$module->price->id, $module->price->amount]
        );
    }
}
