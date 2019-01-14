<?php

use App\Price;
use App\Module;
use App\Period;
use App\Schedule;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ModuleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $current_period = Period::where('active', true)->first();

        $available_schedueles = Schedule::all();
        $amount_of_schedules = count($available_schedueles);
        $available_prices = Price::all();
        $amount_of_prices = count($available_prices);

        for ($i=0; $i < 3 ; $i++) {
            $random_schedule = $available_schedueles[round(rand(0, $amount_of_schedules - 1))];
            $random_price = $available_prices[round(rand(0, $amount_of_prices - 1))];
            Module::create([
                'name' => 'M-' . $i,
                'section' => 'A',
                'clan_id' => $i == 0 ? 1 : null,
                'period_id' => $current_period->id,
                'price_id' => $random_price->id,
                'schedule_id' => $random_schedule->id,
            ]);
        }
    }
}
