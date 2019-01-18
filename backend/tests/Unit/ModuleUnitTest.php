<?php

namespace Tests\Unit;

use App\Role;
use App\User;
use App\Grade;
use App\Price;
use App\Module;
use App\Period;
use Tests\TestCase;
use Illuminate\Support\Facades\Config;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ModuleUnitTest extends TestCase
{
    /**
     * Test Module relationship with Period
     *
     * @return void
     */
    public function testModulePeriodRelationship()
    {
        $module_name = 'Module Test name';
        $period_name = 'Period Test name';
        $period_year = 2018;

        $period = Period::create([
            'name' => $period_name,
            'year' => $period_year
        ]);

        $price = Price::create([
            'amount' => 96382
        ]);

        $module = Module::create([
            'name' => $module_name,
            'period_id' => $period->id
        ]);

        $expected = [
            $module_name,
            $period_name,
            $period_year
        ];

        $this->assertEquals($expected, [
            $module->name,
            $module->period->name,
            $module->period->year
        ]);
    }

    /**
     * Test Module relationship with Grade
     *
     * @return void
     */
    public function testModuleGradesRelationship()
    {
        $module = factory(Module::class)->create();

        $grade = factory(Grade::class)->create([
            'module_id' => $module->id
        ]);

        $expected = [
            $grade->score
        ];

        $this->assertEquals($expected, [
            $module->grades[0]->score
        ]);
    }

    /**
     * Test Module relationship with Price
     *
     * @return void
    */
    public function testModulePriceRelationship()
    {
        $price = Price::create([
            'amount' => 99999
        ]);
        $module = factory(Module::class)->create([
            'price_id' => $price->id,
        ]);

        $this->assertEquals(
            [$price->id, $price->amount],
            [$module->price->id, $module->price->amount]
        );
    }

    /**
     * Test Module relationship with Students (Users)
     *
     * @return void
    */
    public function testModuleStudentsRelationship()
    {
        $module = factory(Module::class)->create();
        $name = $this->faker->word;
        $student = factory(User::class)
                    ->state('as_student')
                    ->create(['name' => $name]);

        $this->assertTrue($student->canRegisterIn($module));
        $student->modulesAsStudent()->attach($module);
        $this->assertFalse($student->canRegisterIn($module));

        $this->assertEquals($name, $module->students[0]->name);
        $this->assertEquals(1, $module->getRegisteredStudents());
        $this->assertEquals(
            Config::get('constants.max_students_per_module') - 1,
            $module->getRemainingSpaces()
        );
    }

    /**
     * Test Module relationship with Instructor (User)
     *
     * @return void
    */
    public function testModuleInstructorRelationship()
    {
        $name = $this->faker->word;
        $instructor = factory(User::class)
                        ->state('as_instructor')
                        ->create([ 'name' => $name]);

        $module = factory(Module::class)->create([
            'instructor_id' => $instructor->id,
        ]);

        $this->assertEquals(
            [$name],
            [$module->instructor->name]
        );
    }

    /**
     * Test Module relationship with Assistant (User)
     *
     * @return void
    */
    public function testModuleAssistantRelationship()
    {
        $name = $this->faker->word;
        $assistant = factory(User::class)
                        ->state('as_assistant')
                        ->create(['name' => $name]);

        $module = factory(Module::class)->create([
            'assistant_id' => $assistant->id,
        ]);

        $this->assertEquals(
            [$name],
            [$module->assistant->name]
        );
    }
}
