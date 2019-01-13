<?php

use App\Schedule;
use Illuminate\Database\Seeder;

class ScheduleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schedule::create([
            'start_date' => '2019-01-07',
            'from' => '08:30',
            'until' => '10:30'
        ]);

        Schedule::create([
            'start_date' => '2019-01-07',
            'from' => '10:30',
            'until' => '12:30'
        ]);

        Schedule::create([
            'start_date' => '2019-01-07',
            'from' => '02:00',
            'until' => '04:00'
        ]);
    }
}
