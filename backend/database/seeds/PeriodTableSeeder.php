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
            'active' => false,
            'signup_from' => '2019-02-01',
            'signup_until' => '2019-02-15'
        ]);

        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'II',
            'active' => false,
            'signup_from' => '2019-04-01',
            'signup_until' => '2019-04-15'
        ]);

        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'II',
            'active' => false,
            'signup_from' => '2019-06-01',
            'signup_until' => '2019-06-15'
        ]);

        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'IV',
            'active' => false,
            'signup_from' => '2019-08-01',
            'signup_until' => '2019-08-15'
        ]);

        Period::create([
            'year' => Carbon::now()->year,
            'name' => 'V',
            'active' => true,
            'signup_from' => '2019-10-01',
            'signup_until' => '2019-10-15'
        ]);
    }
}
