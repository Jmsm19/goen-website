<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
*
* @OA\Schema(
*   schema="GradeStoreRequest",
*   required={"score", "module_id", "user_id"},
*   @OA\Property(
*       description="Grade's score",
*       property="score",
*       type="number",
*       format="double"
*   ),
*   @OA\Property(
*       description="Grade's module id",
*       property="module_id",
*       type="integer",
*       format="int64"
*   ),
*   @OA\Property(
*       description="Grade's user id",
*       property="user_id",
*       type="integer",
*       format="int64"
*   ),
* )
*/
class GradeStoreRequest extends FormRequest
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
            'module_id' => 'required|exists:modules,id',
            'user_id' => 'required|exists:users,id'
        ];
    }
}
