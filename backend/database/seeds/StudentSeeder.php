<?php

use App\Role;
use App\User;
use App\Module;
use App\Period;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role_student = Role::where('name', 'student')->first();

        $user = User::create([
            'name' => 'Simón Inferior',
            'national_id' => (string) round(rand(11111111, 99999999)),
            'email' => 'student@gmail.com',
            'password' => bcrypt('20689293'),
            'phone_number' => '0424-1234567',
            'birth_date' => '2000-10-09',
            'activation_token' => '',
            'active' => 1,
            'email_verified_at' => Carbon::now(),
        ]);
        $user->roles()->attach($role_student);

        $period = Period::where('year', '2018')->first();
        $module = factory(Module::class)->create([
            'name' => 'M-0',
            'period_id' => $period->id,
        ]);
        $user->registerIn($module);
        $module->setModuleStatusFor($user, 'passed');
        $user->setRegistrationStatus('idle');

        $period = Period::where('active', 1)->first();
        factory(Module::class)->create([
            'name' => 'M-1',
            'period_id' => $period->id
        ]);
        factory(Module::class)->create([
            'name' => 'M-0',
            'period_id' => $period->id,
            'clan_id' => 5,
        ]);
        factory(Module::class)->create([
            'name' => 'M-1',
            'period_id' => $period->id
        ]);
        factory(Module::class)->create([
            'name' => 'M-2',
            'period_id' => $period->id
        ]);
    }
}
