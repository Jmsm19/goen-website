<?php

use App\Role;
use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'name' => 'admin',
            'description' => 'Administrator',
        ]);

        Role::create([
            'name' => 'student',
            'description' => 'Student',
        ]);

        Role::create([
            'name' => 'instructor',
            'description' => 'Instructor',
        ]);

        Role::create([
            'name' => 'assistant',
            'description' => 'Assistant',
        ]);
    }
}
