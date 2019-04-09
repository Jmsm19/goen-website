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
            'day' => 'Monday',
            'from' => '08:30',
            'until' => '10:30'
        ]);

        Schedule::create([
            'day' => 'Thursday',
            'from' => '10:30',
            'until' => '12:30'
        ]);

        Schedule::create([
            'day' => 'Sunday',
            'from' => '02:00',
            'until' => '04:00'
        ]);
    }
}
