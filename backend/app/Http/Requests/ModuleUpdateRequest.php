<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Config;
use Illuminate\Foundation\Http\FormRequest;

/**
*
* @OA\Schema(
*   schema="ModuleUpdateRequest",
*   @OA\Property(
*       description="Module's period",
*       property="period_id",
*       type="integer",
*       format="int64"
*   ),
*   @OA\Property(
*       description="Module's name",
*       property="name",
*       type="string"
*   ),
*   @OA\Property(
*       description="Module's section",
*       property="section",
*       type="string"
*   ),
*   @OA\Property(
*       description="Module's price",
*       property="amount",
*       type="number",
*       format="double"
*   ),
*   @OA\Property(
*       description="Module's schedule",
*       property="schedule_id",
*       type="integer",
*       format="int64"
*   ),
* )
*/
class ModuleUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'period_id' => 'exists:periods,id',
            'name' => 'string',
            'section' => [
                'string',
                Rule::in(Config::get('constants.section_letters'))
            ],
            'clan_id' => 'exists:clans,id',
            'section' => 'string',
            'price' => 'numeric|min:0',
            'schedule_id' => 'exists:schedules,id'
        ];
    }
}
