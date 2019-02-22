<?php

use App\Price;
use App\Setting;
use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $prices = Price::get();

        Setting::create([
            'user_signup_active' => true,
            'intro_module_price_id' => $prices[0]->id,
            'basic_modules_price_id' => $prices[0]->id,
            'intermediate_modules_price_id' => $prices[1]->id,
            'advance_modules_price_id' => $prices[2]->id,
            'other_activities_price_id' => $prices[1]->id,
        ]);
    }
}
