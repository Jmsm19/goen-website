<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Config;
use Illuminate\Foundation\Http\FormRequest;

class ModuleStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'period_id' => 'required|exists:periods,id',
            'name' => 'required|string',
            'section' => [
                'required',
                'string',
                Rule::in(Config::get('constants.section_letters'))
            ],
            'price' => 'required|numeric|min:0',
            'schedule_id' => 'required|exists:schedules,id'
        ];
    }

    public function messages()
    {
        return [
            'section.in' => trans('messages.section_not_in_options'),
        ];
    }
}
