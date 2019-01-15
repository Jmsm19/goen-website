<?php

namespace Tests\Unit;

use App\Role;
use App\User;
use App\Grade;
use App\Module;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserUnitTest extends TestCase
{
    /**
     * Test User creation
     *
     * @return void
     */
    public function testUserGradesRelationship()
    {
        $name = 'Tester';
        $email = 'test@email.com';
        $user = factory(User::class)->create([
            'name' => $name,
            'email' => $email,
        ]);

        $grade = factory(Grade::class)->create([
            'user_id' => $user->id
        ]);

        $expected = [$name, $email, $grade->score];

        $this->assertEquals(
            $expected,
        [
            $user->name,
            $user->email,
            $user->grades[0]->score
        ]
        );
    }

    /**
     * Test User has role
     *
     * @return void
     */
    public function testUserHasRole()
    {
        $role = factory(Role::class)->create();
        $user = factory(User::class)->create();
        $user->roles()->attach($role);

        // Has role
        // Single role check
        $this->assertTrue(
            $user->hasAnyRole($role->name)
        );
        // Array check
        $this->assertTrue(
            $user->hasAnyRole(['Non-Role', $role->name])
        );

        // Does not have role
        // Single role check
        $this->assertFalse(
            $user->hasRole('Non-Role')
        );
        // Array check
        $this->assertFalse(
            $user->hasAnyRole(['Non-Role', 'Non-Role 2'])
        );
    }

    /**
     * Test Student (User) Module relationship
     *
     * @return void
     */
    public function testStudentModuleRelationship()
    {
        $module = factory(Module::class)->create();

        $student_role = Role::where('name', 'student')->first();
        $user = factory(User::class)->create();
        $user->roles()->attach($student_role);

        // Is not registered in Module
        $this->assertTrue($user->isNotStudentIn($module->id));

        // Register in Module
        $user->registerIn($module);
        // Is now registered in Module
        $this->assertTrue($user->isStudentIn($module->id));
        $this->assertEquals($module->id, $user->modulesAsStudent[0]->id);

        // Remove from Module
        $user->removeFrom($module);
        $this->assertTrue($user->isNotStudentIn($module->id));
    }

    /**
     * Test Instructor (User) Module relationship
     *
     * @return void
     */
    public function testInstructorModuleRelationship()
    {
        $instructor_role = Role::where('name', 'instructor')->first();
        $user = factory(User::class)->create();
        $user->roles()->attach($instructor_role);
        $module = factory(Module::class)->create([
            'instructor_id' => $user->id,
        ]);

        // Is instructor of Module
        $this->assertEquals($module->id, $user->modulesAsInstructor[0]->id);
        $this->assertTrue($user->isInstructorIn($module->id));

        // Is not instructor of Module
        $module = factory(Module::class)->create();
        $this->assertTrue($user->isNotInstructorIn($module->id));
    }

    /**
     * Test Assistant (User) Module relationship
     *
     * @return void
     */
    public function testAssistantModuleRelationship()
    {
        $assistant_role = Role::where('name', 'assistant')->first();
        $user = factory(User::class)->create();
        $user->roles()->attach($assistant_role);
        $module = factory(Module::class)->create([
            'assistant_id' => $user->id,
        ]);
        // Is assistant of Module
        $this->assertEquals($module->id, $user->modulesAsAssistant[0]->id);
        $this->assertTrue($user->isAssistantIn($module->id));

        // Is not assistant of Module
        $module = factory(Module::class)->create();
        $this->assertTrue($user->isNotAssistantIn($module->id));
    }
}
