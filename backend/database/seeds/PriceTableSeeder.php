<?php

use App\Price;
use Illuminate\Database\Seeder;

class PriceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Price::create([
            'amount' => '1000',
        ]);

        Price::create([
            'amount' => '2000',
        ]);

        Price::create([
            'amount' => '3000',
        ]);
    }
}
