<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    /**
    * @OA\Post(path="/api/auth/signup",
    *   tags={"Model: User"},
    *   summary="Create user and send notification to validate email and user.",
    *   operationId="userSignup",
    *
    *   @OA\RequestBody(
    *       required=true,
    *       @OA\JsonContent(ref="#/components/schemas/SignupRequest"),
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Successful signup",
    *       @OA\JsonContent(ref="#/components/schemas/ResponseMessage")
    *   )
    * )
    */
    public function signup(SignupRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'national_id' => $request->national_id,
            'password' => bcrypt($request->password),
            'birth_date' => $request->birth_date,
            'phone_number' => $request->phone_number,
            'activation_token' => str_random(60),
        ]);

        event(new Registered($user));

        return response()->json([
            'message' => trans('auth.successful_signup'),
        ], 201);
    }

    /**
    * @OA\Get(path="/api/auth/signup/activate/{token}",
    *   tags={"Model: User"},
    *   summary="Activate user based on activation token.",
    *   operationId="userSignupActivate",
    *
    *   @OA\Parameter(
    *       description="Activation token",
    *       in="path",
    *       name="token",
    *       required=true,
    *       @OA\Schema(type="string", format="byte")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="User activated and email confirmed",
    *       @OA\JsonContent(ref="#/components/schemas/User")
    *   )
    * )
    */
    public function signupActivate($token)
    {
        $user = User::where('activation_token', $token)->first();
        Log::debug("Activation token: ". $token);
        Log::debug("Activation attempt for ". $user);
        if (!$user) {
            Log::debug("Last user registered " . User::orderBy('created_at', 'desc')->first());
            return response()->json([
                'message' => trans('auth.invalid_active_token'),
            ], 404);
        }

        $user->active = true;
        $user->markEmailAsVerified();
        $user->activation_token = '';
        $user->save();

        event(new Verified($user));

        return new UserResource($user);
    }

    /**
    * @OA\Post(path="/api/auth/login",
    *   tags={"Model: User"},
    *   summary="Login user and return API Token",
    *   operationId="userLogin",
    *
    *   @OA\RequestBody(
    *       required=true,
    *       @OA\JsonContent(ref="#/components/schemas/LoginRequest"),
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Successfully logged in",
    *       @OA\JsonContent(ref="#/components/schemas/LoginData")
    *   ),
    *   @OA\Response(
    *       response=401,
    *       description="Invalid credentials provided",
    *       @OA\JsonContent(ref="#/components/schemas/ErrorResponse")
    *   )
    * )
    */
    public function login(LoginRequest $request)
    {
        $credentials = request(['email', 'password']);
        $credentials['active'] = 1;
        $credentials['deleted_at'] = null;
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => trans('auth.failed'),
            ], 401);
        }

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();

        return response()->json([
            'accessToken' => $tokenResult->accessToken,
            'tokenType' => 'Bearer',
            'expiresAt' => $request->remember_me ? Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString() : null,
        ]);
    }

    /**
    * @OA\Get(path="/api/auth/logout",
    *   tags={"Model: User"},
    *   summary="Logout user and invalidate Auth Token",
    *   operationId="userLogout",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Response(
    *       response=200,
    *       description="Successfully logged out",
    *       @OA\JsonContent(ref="#/components/schemas/ResponseMessage")
    *   )
    * )
    */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json(['message' => trans('auth.logout')], 200);
    }

    /**
    * @OA\Get(path="/api/auth/user",
    *   tags={"Model: User"},
    *   summary="Get logged in user",
    *   operationId="getLoggedInUser",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Response(
    *       response=200,
    *       description="Return logged in user data",
    *       @OA\JsonContent(ref="#/components/schemas/SingleUser")
    *   )
    * )
    */
    public function user(Request $request)
    {
        return new UserResource($request->user());
    }
}
