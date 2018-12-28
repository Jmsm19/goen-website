<?php

namespace Tests\Unit;

use App\Role;
use App\User;
use App\Grade;
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
    public function testCanCreateUser()
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
}
