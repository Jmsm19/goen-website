<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Requests\UserUpdateRequest;

class UserController extends Controller
{
    /**
    * @OA\Get(path="/api/user",
    *   tags={"Model: User", "Role: Admin"},
    *   summary="Display a listing of Users",
    *   operationId="getAllUsers",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Response(
    *       response=200,
    *       description="Users found",
    *       @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/UserCollection"))
    *   )
    * )
    */
    public function index()
    {
        return UserResource::collection(User::all());
    }

    /**
    * @OA\Get(path="/api/user/{user}",
    *   tags={"Model: User", "Role: Admin"},
    *   summary="Get a User by Id",
    *   operationId="getUserById",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of user",
    *       in="path",
    *       name="user",
    *       required=true,
    *       @OA\Schema(format="int64", type="integer")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="User found",
    *       @OA\JsonContent(ref="#/components/schemas/SingleUser")
    *   )
    * )
    */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
    * @OA\Put(path="/api/user/{user}",
    *   tags={"Model: User", "Role: Admin"},
    *   summary="Update user data",
    *   operationId="updateUser",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of user",
    *       in="path",
    *       name="user",
    *       required=true,
    *       @OA\Schema(format="int64", type="integer")
    *   ),
    *   @OA\RequestBody(
    *       required=true,
    *       @OA\JsonContent(ref="#/components/schemas/UserUpdateRequest"),
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Returns updated user",
    *       @OA\JsonContent(ref="#/components/schemas/SingleUser")
    *   ),
    *   @OA\Response(
    *       response=403,
    *       description="No privilages. Only Admin user or owner can update data.",
    *       @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
    *   )
    * )
    */
    public function update(UserUpdateRequest $request, User $user)
    {
        if ($request->user()->hasRole('admin') || $request->user()->id == $user->id) {
            $user->update($request->only(['name', 'phone_number', 'birth_date']));
            return new UserResource($user);
        }

        return response()->json([
            'error' => trans('auth.no_privilages')
        ], 403);
    }

    /**
    * @OA\Delete(path="/api/user/{user}",
    *   tags={"Model: User", "Role: Admin"},
    *   summary="Delete user",
    *   operationId="deleteUser",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of user",
    *       in="path",
    *       name="user",
    *       required=true,
    *       @OA\Schema(format="int64", type="integer")
    *   ),
    *   @OA\Response(
    *       response=204,
    *       description="User deleted",
    *   )
    * )
    */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }
}
