<?php

namespace App\Http\Requests;

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
            'schedule_id' => 'required|exists:schedules,id'
        ];
    }
}
