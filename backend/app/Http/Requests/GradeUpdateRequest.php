<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
*
* @OA\Schema(
*   schema="GradeUpdateRequest",
*   @OA\Property(
*       description="Grade's new score",
*       property="score",
*       type="number",
*       format="double"
*   ),
* )
*/
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
            'score' => 'numeric|min:0|max:100',
        ];
    }
}
