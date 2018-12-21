<?php

use App\Module;
use App\Period;
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

        for ($i=0; $i < 3 ; $i++) {
            Module::create([
                'name' => 'M-' . $i . ' ' . 'A',
                'period_id' => $current_period->id
            ]);
        }
    }
}
