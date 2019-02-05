<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
*
* @OA\Schema(
*   schema="PeriodUpdateRequest",
*   @OA\Property(
*       description="Period's name",
*       property="name",
*       type="string"
*   ),
*   @OA\Property(
*       description="Period's year",
*       property="year",
*       type="string"
*   ),
*   @OA\Property(
*       description="Period's registrations start date",
*       property="signup_from",
*       type="string",
*       format="date"
*   ),
*   @OA\Property(
*       description="Period's registrations end date",
*       property="signup_until",
*       type="string",
*       format="date"
*   ),
*   @OA\Property(
*       description="Should it be created as current active Period",
*       property="make_current",
*       type="boolean"
*   ),
* )
*/
class PeriodUpdateRequest extends FormRequest
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
            'year' => 'date_format:Y',
            'signup_from' => 'date',
            'signup_until' => 'date|after:signup_from'
        ];
    }
}
