<?php

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


        for ($i=0; $i < 3 ; $i++) {
            $random_schedule = $available_schedueles[round(rand(0, $amount_of_schedules - 1))];
            Module::create([
                'name' => 'M-' . $i . ' ' . 'A',
                'period_id' => $current_period->id,
                'schedule_id' => $random_schedule->id,
            ]);
        }
    }
}
