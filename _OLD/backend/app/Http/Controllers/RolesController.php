<?php

namespace App\Http\Controllers;

use App\Role;
use App\User;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    /**
    * @OA\Delete(path="/api/users/{id}/{role}",
    *   tags={"Model: Role", "Role: Admin"},
    *   summary="Remove Role from specified user",
    *   operationId="removeRoleFromUser",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of user",
    *       in="path",
    *       name="id",
    *       required=true,
    *       @OA\Schema(format="int64", type="integer")
    *   ),
    *   @OA\Parameter(
    *       description="Role name",
    *       in="path",
    *       name="role",
    *       @OA\Schema(type="string")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Role removed from User",
    *       @OA\JsonContent(ref="#/components/schemas/ResponseMessage")
    *   ),
    *   @OA\Response(
    *       response=400,
    *       description="Error due to: admins can't change their own roles as admins, user does not have role, user must have at least one role, etc.",
    *       @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
    *   )
    * )
    */
    public function removeRole(Request $request, $id, $role)
    {
        // Admins can't remove own roles
        if ($id == $request->user()->id && $role == 'admin') {
            return response()->json([
                'error' => trans('messages.admin_forbid_self_role_change'),
             ], 400);
        }

        $user = User::where('id', $id)->first();

        // Send response if user doesn't have specified role
        if (!$user->hasRole($role)) {
            return response()->json([
                'error' => trans('messages.not_has_role', ['role' => $role]),
            ], 400);
        }

        // Do not allow removal of role if user only has one
        if (count($user->roles()->get()) == 1) {
            return response()->json([
                'error' => trans('messages.at_least_one_role'),
            ], 400);
        }

        // Remove Role from user
        $role_to_delete = Role::where('name', $role)->first();
        $user->roles()->detach($role_to_delete);
        return response()->json([
            'message' => trans('messages.role_removed', ['role' => $role]),
         ], 200);
    }
}
