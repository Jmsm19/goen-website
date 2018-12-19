<?php

namespace App\Http\Controllers;

use App\Role;
use App\User;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    public function addRole($id, $role)
    {
        $user = User::where('id', $id)->first();
        $new_role = Role::where('name', $role)->first();

        if ($user->hasRole($role)) {
            return response()->json([
               'message' => 'User already has role',
            ], 200);
        }

        $user->roles()->attach($new_role);
        return response()->json([
            'message' => 'User is now ' . $role,
         ], 200);
    }

    public function removeRole(Request $request, $id, $role)
    {
        if ($id == $request->user()->id) {
            return response()->json([
                'message' => 'Admins cannot remove their own roles',
             ], 200);
        }

        $user = User::where('id', $id)->first();
        $role_to_delete = Role::where('name', $role)->first();

        if (!$user->hasRole($role)) {
            return response()->json([
                'message' => 'The user is not ' . $role,
             ], 200);
        }

        $user->roles()->detach($role_to_delete);
        return response()->json([
            'message' => 'User is no longer ' . $role,
         ], 200);
    }
}
