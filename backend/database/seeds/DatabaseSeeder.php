<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    private $seeders = [
        PeriodTableSeeder::class,
        ClanTableSeeder::class,
        RoleTableSeeder::class,
        UserTableSeeder::class,
        ScheduleTableSeeder::class,
        PriceTableSeeder::class,
        ModuleTableSeeder::class,
        StudentSeeder::class
    ];

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call($this->seeders);
    }
}
