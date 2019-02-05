<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
*
* @OA\Schema(
*   schema="LoginRequest",
*   required={"email", "password"},
*   @OA\Property(
*     description="User email",
*     property="email",
*     type="string",
*   ),
*   @OA\Property(
*     description="User password",
*     property="password",
*     type="string",
*     format="password",
*   )
* )
*/
class LoginRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean',
        ];
    }
}
