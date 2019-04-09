<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
*
* @OA\Schema(
*   schema="PeriodStoreRequest",
*   required={"signup_from", "signup_until"},
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
class PeriodStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'year' => 'date_format:Y',
            'signup_from' => 'required|date',
            'signup_until' => 'required|date|after:signup_from',
            'make_current' => 'boolean'
        ];
    }
}
