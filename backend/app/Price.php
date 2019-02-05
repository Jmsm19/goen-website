<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     title="Price",
 *     description="Modules possible registration price",
 *     required={"id", "amount"}
 * )
 */
class Price extends Model
{
    /**
    * @OA\Property(
    *     property="id",
    *     description="Unique identificator",
    *     title="id",
    *     type="integer",
    *     format="int64",
    * ),
    * @OA\Property(
    *     property="amount",
    *     description="Price",
    *     title="amount",
    *     type="number",
    *     format="double",
    * )
    */

    protected $fillable = [
        'amount'
    ];

    public function modules()
    {
        return $this->hasMany('App\Module');
    }
}
