<?php

use App\Role;
use App\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_student = Role::where('name', 'student')->first();
        $role_admin = Role::where('name', 'admin')->first();
        $role_instructor = Role::where('name', 'instructor')->first();
        $role_assistant = Role::where('name', 'assistant')->first();

        User::create([
            'name' => 'Jorge Soto',
            'national_id' => '20689293',
            'email' => 'jorgemsm19@gmail.com',
            'password' => bcrypt('20689293'),
            'phone_number' => '0424-1234567',
            'birth_date' => '1992-01-09',
            'activation_token' => '',
            'active' => 1,
            'email_verified_at' => Carbon::now(),
            'clan_id' => 1
        ])->roles()->attach($role_admin);

        User::create([
            'name' => 'Gabriel Flores',
            'national_id' => '20580431',
            'email' => 'gflores92@gmail.com',
            'password' => bcrypt('20580431'),
            'phone_number' => '0424-1234567',
            'birth_date' => '1945-20-04',
            'activation_token' => '',
            'active' => 1,
            'email_verified_at' => Carbon::now(),
            'clan_id' => 1
        ])->roles()->attach($role_instructor);

        User::create([
            'name' => 'Simón Inferior',
            'national_id' => (string) round(rand(11111111, 99999999)),
            'email' => 'emailtonto@gmail.com',
            'password' => bcrypt('1234567'),
            'phone_number' => '0424-1234567',
            'birth_date' => '2000-10-09',
            'activation_token' => '',
            'active' => 1,
            'email_verified_at' => Carbon::now(),
        ])->roles()->attach($role_student);

        User::create([
            'name' => 'Asistente Apellido',
            'national_id' => (string) round(rand(11111111, 99999999)),
            'email' => 'asistente@gmail.com',
            'password' => bcrypt('1234567'),
            'phone_number' => '0424-1234567',
            'birth_date' => '1998-10-09',
            'activation_token' => '',
            'active' => 1,
            'email_verified_at' => Carbon::now(),
        ])->roles()->attach($role_assistant);
    }
}
