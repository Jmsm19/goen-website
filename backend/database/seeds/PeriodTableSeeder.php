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
            'year' => Carbon::now()->year - 1,
            'name' => 'VI',
            'active' => false,
            'signup_from' => '2018-12-01',
            'signup_until' => '2018-12-31'
        ]);

        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'I',
            'active' => false,
            'signup_from' => '2019-01-01',
            'signup_until' => '2019-01-31'
        ]);

        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'II',
            'active' => true,
            'signup_from' => '2019-02-01',
            'signup_until' => '2019-02-28'
        ]);

        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'III',
            'active' => false,
            'signup_from' => '2019-03-01',
            'signup_until' => '2019-03-31'
        ]);

        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'IV',
            'active' => false,
            'signup_from' => '2019-04-01',
            'signup_until' => '2019-04-30'
        ]);

        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'V',
            'active' => false,
            'signup_from' => '2019-05-01',
            'signup_until' => '2019-05-31'
        ]);
    }
}
