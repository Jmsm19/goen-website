<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Config;
use Illuminate\Foundation\Http\FormRequest;

/**
*
* @OA\Schema(
*   schema="ModuleStoreRequest",
*   required={"period_id", "name", "section", "amount", "schedule_id"},
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
*       description="Module's clan. (Only required when creating an M-0)",
*       property="clan_id",
*       type="integer",
*       format="int64"
*   ),
*   @OA\Property(
*       description="Module's schedule",
*       property="schedule_id",
*       type="integer",
*       format="int64"
*   ),
* )
*/
class ModuleStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'period_id' => 'required|exists:periods,id',
            'name' => 'required|string',
            'section' => [
                'required',
                'string',
                Rule::in(Config::get('constants.section_letters'))
            ],
            'schedule_id' => 'required|exists:schedules,id'
        ];

        if (FormRequest::input('name') == 'M-0') {
            $rules['clan_id'] = 'required|exists:clans,id';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'section.in' => trans('messages.section_not_in_options'),
        ];
    }
}
