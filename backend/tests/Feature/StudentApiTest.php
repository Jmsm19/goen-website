<?php

namespace Tests\Feature;

use App\User;
use App\Module;
use App\Period;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class StudentApiTest extends TestCase
{
    /**
     * Test Student registration in Module
     *
     * @return void
     */
    public function testRegisterStudentInModule()
    {
        $student = $this->passportActingAs('student');
        $period = factory(Period::class)->create(['name' => 'I']);
        $module = factory(Module::class)->create([
            'name' => 'M-0',
            'period_id' => $period->id,
        ]);

        /**
         * Successfuly registered Student (User)
         */
        $this->assertTrue($student->isNotStudentIn($module->id));
        $this->post(route('student.registration', ['module' => $module->id]))
            ->assertStatus(200)
            ->assertJson(['message' => trans('messages.succesfully_registered')]);
        $this->assertTrue($student->isStudentIn($module->id));

        /**
         * Fail registraion, student already in module or Module is full
         */
        $this->post(route('student.registration', ['module' => $module->id]))
            ->assertStatus(400)
            ->assertJson(['error' => trans('messages.module_full_or_registered')]);

        /**
         * Fail registration, can't register on more than one Module per Period
         */
        $module = factory(Module::class)->create([
            'name' => 'M-1',
            'period_id' => $period->id,
        ]);
        $this->post(route('student.registration', ['module' => $module->id]))
            ->assertStatus(400)
            ->assertJson(['error' => trans('messages.only_one_module_per_period')]);

        /**
         * Fail registraion, Module has no space available
         */
        $period = factory(Period::class)->create(['name' => 'II']);
        $module = factory(Module::class)->create([
            'name' => 'M-2',
            'period_id' => $period->id,
        ]);
        $max_students_per_module = (integer) config('constants.max_students_per_module');
        $students = factory(User::class, $max_students_per_module)->state('as_student')->create();

        for ($i=0; $i < $max_students_per_module; $i++) {
            $students[$i]->registerIn($module);
        }

        $this->post(route('student.registration', ['module' => $module->id]))
            ->assertStatus(400)
            ->assertJson(['error' => trans('messages.module_full_or_registered')]);

        /**
         * Fail registration, User does not have student Role
         */
        $this->passportActingAs('assistant');
        $this->post(route('student.registration', ['module' => $module->id]))
                ->assertStatus(403)
                ->assertJson(['error' => trans('auth.no_privilages')]);
    }
}
