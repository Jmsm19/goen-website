<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use App\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Create user and send notification to validate email and user.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function signup(SignupRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
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
     * Activate user based on activation token.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\Response
     */
    public function signupActivate($token)
    {
        $user = User::where('activation_token', $token)->first();

        if (!$user) {
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
     * Login user and send API Token.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
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
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString(),
        ]);
    }

    /**
     * Logout user and invalidate API Token.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json(['message' => trans('auth.logout')], 200);
    }

    /**
     * Get logged in user.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function user(Request $request)
    {
        return new UserResource($request->user());
    }

    /**
     * Response when accessing area without being logged in.
     *
     * @return \Illuminate\Http\Response
     */
    public function unauthorized()
    {
        return response()->json([
            'message' => trans('auth.login_first'),
        ], 401);
    }
}
