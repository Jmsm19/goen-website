<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
*
* @OA\Schema(
*   schema="PriceUpdateRequest",
*   @OA\Property(
*       description="Price's score",
*       property="amount",
*       type="number",
*       format="double"
*   )
* )
*/
class PriceUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'amount' => 'numeric|min:0|unique:prices'
        ];
    }
}
