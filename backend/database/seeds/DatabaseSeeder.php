<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ClanTableSeeder::class);
        $this->call(RoleTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(PeriodTableSeeder::class);
        $this->call(ScheduleTableSeeder::class);
        $this->call(ModuleTableSeeder::class);
    }
}
