<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *   schema="SignupRequest",
 *   required={
 *      "name", "national_id", "password", "password_confirmation",
 *      "email", "phone_number", "birth_date"
 *   },
 *   @OA\Property(
 *       description="User's name",
 *       property="name",
 *       type="string"
 *   ),
 *   @OA\Property(
 *       description="User's national identification",
 *       property="national_id",
 *       type="string"
 *   ),
 *   @OA\Property(
 *       description="User's password",
 *       property="password",
 *       type="string",
 *       format="password"
 *   ),
 *   @OA\Property(
 *       description="User's password confirmation",
 *       property="password_confirmation",
 *       type="string",
 *      format="password"
 *   ),
 *   @OA\Property(
 *       description="User's email",
 *       property="email",
 *       type="string"
 *   ),
 *   @OA\Property(
 *       description="User's phone number",
 *       property="phone_number",
 *       type="string"
 *   ),
 *   @OA\Property(
 *       description="User's birth_date",
 *       property="birth_date",
 *       type="string",
 *      format="date"
 *   ),
 *   @OA\Property(
 *       description="Role that the user will have on signup. Default: student",
 *       property="role_name",
 *       type="string"
 *   ),
 * )
 */
class SignupRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'national_id' => 'required|string|unique:users',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed',
            'birth_date' => 'required|string',
            'phone_number' => 'required|string',
            'role_name' => 'string',
        ];
    }
}
