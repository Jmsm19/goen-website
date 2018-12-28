<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GradeUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'score' => 'required|numeric|min:0|max:100',
        ];
    }
}
