<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
