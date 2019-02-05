<?php

namespace App\Http\Requests;

use Illuminate\Http\Request;
use Illuminate\Foundation\Http\FormRequest;

/**
* @OA\Schema(
*   schema="UserUpdateRequest",
*   @OA\Property(
*       description="User's new name",
*       property="name",
*       type="string"
*   ),
*   @OA\Property(
*       description="User's new phone number",
*       property="phone_number",
*       type="string"
*   ),
*   @OA\Property(
*       description="User's new birth_date",
*       property="birth_date",
*       type="string",
*       format="date"
*   ),
* )
*/
class UserUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'string',
            'phone_number' => 'string',
            'birth_date' => 'string'
        ];
    }
}
