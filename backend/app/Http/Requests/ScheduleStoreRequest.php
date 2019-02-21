<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

/**
* @OA\Schema(
*   schema="ScheduleStoreRequest",
*   required={"day", "from", "until"},
*   @OA\Property(
*       description="Class day",
*       property="day",
*       type="string",
*       format="date"
*   ),
*   @OA\Property(
*       description="Class start time",
*       property="from",
*       type="string"
*   ),
*   @OA\Property(
*       description="Class end time",
*       property="until",
*       type="string"
*   ),
* )
*/
class ScheduleStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'day' => [
                'required',
                'string',
                Rule::in(config('constants.days'))
            ],
            'from' => 'date_format:H:i|required',
            'until' => 'date_format:H:i|required',
        ];
    }
}
