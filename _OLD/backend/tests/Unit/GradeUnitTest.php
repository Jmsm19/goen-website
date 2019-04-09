<?php

namespace Tests\Unit;

use App\User;
use App\Grade;
use App\Module;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GradeUnitTest extends TestCase
{
    /**
     * Test can create Grade
     * This also tests the relationship with User and Module
     *
     * @return void
     */
    public function testCanCreateGrade()
    {
        $module = factory(Module::class)->create();
        $user = factory(User::class)->create();
        $score = rand(0, 100);

        $grade = Grade::create([
            'score' => $score,
            'module_id' => $module->id,
            'user_id' => $user->id,
        ]);

        $this->assertEquals(
            [$grade->score, $grade->module->name, $grade->user->name],
            [$score, $module->name, $user->name]
        );
    }
}
