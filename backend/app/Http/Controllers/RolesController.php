<?php

namespace App\Http\Controllers;

use App\Role;
use App\User;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    /**
     * Add Role to specified user (id)
     *
     * @param  int $id
     * @return string $role
     */
    public function addRole($id, $role)
    {
        // Get user
        $user = User::where('id', $id)->first();

        // Prevent addition of role if user already has it
        if ($user->hasRole($role)) {
            return response()->json([
                'message' => trans('messages.has_role', ['role' => $role]),
            ], 200);
        }

        // Add Role
        $new_role = Role::where('name', $role)->first();
        $user->roles()->attach($new_role);
        return response()->json([
            'message' => trans('messages.role_added', ['role' => $role]),
         ], 200);
    }

    /**
     * Remove Role from specified user (id)
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return string $role
     */
    public function removeRole(Request $request, $id, $role)
    {
        // Admins can't remove own roles
        if ($id == $request->user()->id) {
            return response()->json([
                'message' => trans('messages.admin_forbid_self_role_change'),
             ], 200);
        }

        $user = User::where('id', $id)->first();

        // Send response if user doesn't have specified role
        if (!$user->hasRole($role)) {
            return response()->json([
                'message' => trans('messages.not_has_role', ['role' => $role]),
            ], 200);
        }

        // Do not allow removal of role if user only has one
        if (count($user->roles()->get()) == 1) {
            return response()->json([
                'message' => trans('messages.at_least_one_role'),
            ], 200);
        }

        // Remove Role from user
        $role_to_delete = Role::where('name', $role)->first();
        $user->roles()->detach($role_to_delete);
        return response()->json([
            'message' => trans('messages.role_removed', ['role' => $role]),
         ], 200);
    }
}
