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
            'id' => 1,
            'name' => 'admin',
            'description' => 'Administrator',
        ]);

        Role::create([
            'id' => 2,
            'name' => 'instructor',
            'description' => 'Instructor',
        ]);

        Role::create([
            'id' => 3,
            'name' => 'assistant',
            'description' => 'Assistant',
        ]);

        Role::create([
            'id' => 4,
            'name' => 'student',
            'description' => 'Student',
        ]);
    }
}
