<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
*
* @OA\Schema(
*   schema="ClanUpdateRequest",
*   @OA\Property(
*       description="Clan's new name",
*       property="name",
*       type="string"
*   ),
*   @OA\Property(
*       description="Clan's new picture url",
*       property="picture",
*       type="string"
*   ),
* )
*/
class ClanUpdateRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'string',
            'picture' => 'string',
        ];
    }
}
