<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
* @OA\Schema(
*   schema="ScheduleUpdateRequest",
*   @OA\Property(
*       description="Class date",
*       property="start_date",
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
class ScheduleUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'start_date' => 'date',
            'from' => 'date_format:H:i',
            'until' => 'date_format:H:i',
        ];
    }
}
