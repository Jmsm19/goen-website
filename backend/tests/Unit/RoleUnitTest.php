<?php

namespace Tests\Unit;

use App\Role;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RoleUnitTest extends TestCase
{
    /**
     * Test Period creation
     *
     * @return void
     */
    public function testCanCreateRole()
    {
        $name = 'Role name';
        $description = 'Role description';

        $role = Role::create([
            'name' => $name,
            'description' => $description,
        ]);

        $expected = [$name, $description];

        $this->assertEquals($expected, [$role->name, $role->description]);
    }

    /**
     * Test Period creation
     *
     * @return void
     */
    public function testRoleUserRelationship()
    {
        $name = 'Role name';
        $description = 'Role description';

        $role = Role::create([
            'name' => $name,
            'description' => $description,
        ]);

        $user = factory(User::class)->create();
        $user->roles()->attach($role);

        $expected = [$name, $description, $user->name];

        $this->assertEquals(
            $expected,
            [$role->name, $role->description, $role->users[0]->name]
        );
    }
}
