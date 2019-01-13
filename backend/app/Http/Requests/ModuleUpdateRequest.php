<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'price' => 'numeric|min:0',
            'schedule_id' => 'exists:schedules,id'
        ];
    }
}
