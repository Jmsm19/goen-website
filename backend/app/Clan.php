<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
* @OA\Schema(
* schema="Clan",
* title="Clan",
* description="Clan model",
* required={"id", "name"}
* )
*/
class Clan extends Model
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
    *     property="name",
    *     description="Clan name",
    *     title="name",
    *     type="string",
    * ),
    * @OA\Property(
    *     property="picture",
    *     description="Clan picture",
    *     title="picture",
    *     type="string",
    * )
     */
    protected $fillable = [
        'name', 'picture'
    ];

    public function users()
    {
        return $this->hasMany('App\User');
    }
}
