<?php

namespace Tests\Feature;

use App\User;
use App\Module;
use App\Period;
use Carbon\Carbon;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class StudentApiTest extends TestCase
{
    private function makeImageName($student)
    {
        $username = implode('_', explode(' ', $student->name));
        $national_id = $student->national_id;
        $current_module = $student->currentModule();
        $module = $current_module->name . '_' . $current_module->section;
        $ext = 'jpg';

        return "{$username}_{$national_id}_{$module}.{$ext}";
    }

    /**
     * Test Student registration in Module
     *
     * @return void
     */
    public function testRegisterStudentInModule()
    {
        $student = $this->passportActingAs('student');
        $period = factory(Period::class)->create([
            'name' => 'I',
            'signup_from' => Carbon::now()->format('Y-m-d'),
            'signup_until' => Carbon::now()->addWeeks(2)->format('Y-m-d')
        ]);
        $module = factory(Module::class)->create([
            'name' => 'M-0',
            'period_id' => $period->id,
        ]);

        /**
         * Successfuly registered Student (User)
         */
        $this->assertEquals('idle', $student->registration_status);
        $this->assertTrue($student->isNotStudentIn($module));
        $this->post(route('student.registration', ['module' => $module->id]))
            ->assertStatus(200)
            ->assertJson(['message' => trans('messages.succesfully_registered')]);
        $this->assertTrue($student->isStudentIn($module));
        $this->assertEquals('paying', $student->registration_status);

        // Check module status
        $module_status = $student->modulesAsStudent()
                                ->where('module_id', $module->id)->first()
                                ->pivot->status;
        $this->assertEquals('current', $module_status);
        // Set module as failed
        $module->setModuleStatusFor($student, 'failed');
        $module_status = $student->modulesAsStudent()
                                ->where('module_id', $module->id)->first()
                                ->pivot->status;
        $this->assertEquals('failed', $module_status);
        $this->assertEquals($module->id, $student->failedModules()[0]->id);
        // Set module as passed
        $module->setModuleStatusFor($student, 'passed');
        $module_status = $student->modulesAsStudent()
                                ->where('module_id', $module->id)->first()
                                ->pivot->status;
        $this->assertEquals('passed', $module_status);
        $this->assertEquals($module->id, $student->previousModules()[0]->id);

        /**
         * Fail registraion, student already in module
         */
        $this->post(route('student.registration', ['module' => $module->id]))
            ->assertStatus(400)
            ->assertJson(['error' => trans('messages.already_registered_in_module')]);

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
        $period = factory(Period::class)->create([
            'name' => 'II',
            'signup_from' => Carbon::now()->format('Y-m-d'),
            'signup_until' => Carbon::now()->addWeeks(2)->format('Y-m-d')
        ]);
        $module = factory(Module::class)->create([
            'name' => 'M-1',
            'period_id' => $period->id
        ]);
        $max_students_per_module = (integer) config('constants.max_students_per_module');
        $students = factory(User::class, $max_students_per_module)->state('as_student')->create();

        for ($i=0; $i < $max_students_per_module; $i++) {
            $students[$i]->registerIn($module);
        }

        $this->post(route('student.registration', ['module' => $module->id]))
            ->assertStatus(400)
            ->assertJson(['error' => trans('messages.module_full')]);

        /**
         * Fail registraion, incorrect next module
         */
        $period = factory(Period::class)->create([
            'signup_from' => Carbon::now()->format('Y-m-d'),
            'signup_until' => Carbon::now()->addWeeks(2)->format('Y-m-d')
        ]);
        $module = factory(Module::class)->create([
            'name' => 'M-2',
            'period_id' => $period->id,
        ]);
        $this->post(route('student.registration', ['module' => $module->id]))
            ->assertStatus(400)
            ->assertJson(['error' => trans('messages.wrong_next_module', ['module' => 'M-1'])]);

        /**
         * Fail registration, trying to register outside registration threshold
         */
        $period = factory(Period::class)->create([
            'name' => 'III',
            'signup_from' => Carbon::now()->subWeeks(3)->format('Y-m-d'),
            'signup_until' => Carbon::now()->subWeeks(1)->format('Y-m-d')
        ]);
        // Carbon::now() would return a date 1 week later than the signup period
        $module = factory(Module::class)->create([
            'name' => 'M-3',
            'period_id' => $period->id,
        ]);

        $this->post(route('student.registration', ['module' => $module->id]))
            ->assertStatus(400)
            ->assertJson(['error' => trans('messages.registration_outside_threshold')]);

        /**
         * Fail registration, User does not have student Role
         */
        $this->passportActingAs('assistant');
        $this->post(route('student.registration', ['module' => $module->id]))
                ->assertStatus(403)
                ->assertJson(['error' => trans('auth.no_privilages')]);
    }

    // public function testUploadTransferCapture()
    // {
    //     $student = $this->passportActingAs('student');
    //     // Register User in Module
    //     $module = factory(Module::class)->create();
    //     $student->registerIn($module);
    //     // Create fake dropbox folder
    //     Storage::fake('dropbox');

    //     $this->json('POST', route('student.transfercapture'), [
    //         'image' => UploadedFile::fake()->image('comprobante.jpg')
    //     ]);

    //     // Current Period subfolder
    //     $period = Period::where('active', 1)->first();
    //     $period_name = "Período {$period->name}-{$period->year}";

    //     // Image name
    //     $image_name = $this->makeImageName($student);

    //     Storage::disk('dropbox')->assertExists("comprobantes/{$period_name}/{$image_name}");
    // }
}
