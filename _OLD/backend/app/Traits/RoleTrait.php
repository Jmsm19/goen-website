<?php

namespace App\Traits;

use App\Role;
use App\User;

trait RoleTrait
{
    public function addRole($id, $role)
    {
        // Get user
        $user = User::where('id', $id)->first();

        // Prevent addition of role if user already has it
        if ($user->hasRole($role)) {
            return null;
        }


        // Add Role
        $new_role = Role::where('name', $role)->first();
        $user->roles()->attach($new_role);

        return $user;
    }
}
