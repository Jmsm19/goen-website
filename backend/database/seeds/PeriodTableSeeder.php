<?php

use App\Period;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PeriodTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'I',
            'active' => false
        ]);

        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'II',
            'active' => false
        ]);

        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'II',
            'active' => false
        ]);

        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'IV',
            'active' => false
        ]);

        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'V',
            'active' => true
        ]);
    }
}
