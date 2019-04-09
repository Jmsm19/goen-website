<?php

namespace Tests\Feature;

use App\Role;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RoleApiTest extends TestCase
{
    /**
    * Test admin can remove roles from users
    *
    * @return void
    */
    public function testCanRemoveRole()
    {
        $admin_user = $this->passportActingAs('admin');
        $role = 'student';
        $user = factory(User::class)->state("as_{$role}")->create();

        // Admin can't remove own roles
        $params = [
            'id' => $admin_user->id,
            'role' => 'admin'
        ];
        $this->delete(route('remove_role', $params))
            ->assertStatus(400)
            ->assertJson([
                'error' => trans('messages.admin_forbid_self_role_change')
            ]);

        // Throw error when trying to delete the only role a user has
        $params = [
            'id' => $user->id,
            'role' => $role
        ];
        $this->delete(route('remove_role', $params))
            ->assertStatus(400)
            ->assertJson([
                'error' => trans('messages.at_least_one_role')
            ]);

        // Throw error when trying to delete a role the user doesn't have
        $params = [
            'id' => $user->id,
            'role' => 'instructor'
        ];
        $this->delete(route('remove_role', $params))
            ->assertStatus(400)
            ->assertJson([
                'error' =>
                    trans('messages.not_has_role', ['role' => $params['role']])
            ]);

        // Successful role removal
        $role_name = 'instructor';
        $role = Role::where('name', $role_name)->first();
        $user->roles()->attach($role);
        $params = [
            'id' => $user->id,
            'role' => $role_name
        ];
        $this->delete(route('remove_role', $params))
            ->assertStatus(200)
            ->assertJson([
                'message' =>
                    trans('messages.role_removed', ['role' => $params['role']])
            ]);
        $this->assertFalse($user->hasRole($role_name));
    }
}