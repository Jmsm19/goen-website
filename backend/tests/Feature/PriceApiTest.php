<?php

namespace Tests\Feature;

use App\Price;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PriceApiTest extends TestCase
{
    /**
      * Test get list of Prices
      *
      * @return void
      */
    public function testGetAllPrices()
    {
        $this->passportActingAs('admin');

        $this->get(route('price.index'))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    [
                        'id', 'amount'
                    ]
                ]
            ]);
    }

    /**
     * Test get specified Price
     *
     * @return void
     */
    public function testGetPrice()
    {
        $this->passportActingAs('admin');
        $price = Price::firstOrCreate([
            'amount' => $this->faker->randomFloat(2, 1000)
        ]);

        $this->get(route('price.show', ['price' => $price->id]))
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $price->id,
                    'amount' => $price->amount,
                ]
            ]);
    }

    /**
     * Test create new Price
     *
     * @return void
     */
    public function testPriceStore()
    {
        $this->passportActingAs('admin');

        // Successful store
        $params = [
            'amount' => $this->faker->randomFloat(2, 1000),
        ];

        $this->json('POST', route('price.store'), $params)
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id', 'amount'
                ]
            ]);

        // Failed store - Price already exists - using previous params
        $this->json('POST', route('price.store'), $params)
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'amount'
            ]);

        // Failed store - wrong params
        $params = [
            'amount' => "Not an decimal",
        ];

        $this->json('POST', route('price.store'), $params)
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'amount'
            ]);

        // Failed store - no params
        $this->json('POST', route('price.store'))
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'amount'
            ]);
    }

    /**
     * Test update Price
     *
     * @return void
     */
    public function testPriceUpdate()
    {
        $this->passportActingAs('admin');
        $price =Price::firstOrCreate([
            'amount' => $this->faker->randomFloat(2, 1000)
        ]);

        // Successful update
        $params = [
            'amount' => $this->faker->randomFloat(),
        ];

        $this->json(
            'PUT',
            route('price.update', ['price' => $price->id]),
            $params,
            $this->headers
        )
        ->assertStatus(200)
        ->assertJson([
            'data' => [
                'amount' => $params['amount'],
            ]
        ]);

        // Failed update
        $params = [
            'amount' => -9999,
        ];

        $this->json(
            'PUT',
            route('price.update', ['price' => $price->id]),
            $params,
            $this->headers
        )
        ->assertStatus(422)
        ->assertJsonValidationErrors([
            'amount'
        ]);
    }

    /**
     * Test Price delete
     */
    public function testPriceDelete()
    {
        $this->passportActingAs('admin');
        $price =Price::firstOrCreate([
            'amount' => $this->faker->randomFloat(2, 1000)
        ]);

        $this->delete(route('price.destroy', ['price' => $price->id]))
            ->assertStatus(204);
    }
}
