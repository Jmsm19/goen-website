<?php

namespace Tests\Unit;

use App\Price;
use App\Module;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PriceUnitTest extends TestCase
{
    /**
     * Test Price relationship with Users
     *
     * @return void
     */
    public function testPriceModuleRelationship()
    {
        $price = Price::firstOrCreate([
            'amount' => $this->faker->randomFloat(2, 1000)
        ]);

        $module = factory(Module::class)->create([
            'price_id' => $price->id
        ]);

        $this->assertEquals(
            $price->modules[0]->id,
            $module->price->id
        );
    }
}
