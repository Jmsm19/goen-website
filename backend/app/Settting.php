<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     title="Settting",
 *     description="Settting model",
 *     required={
 *      "id", "name", "user_signup_active"
 *     }
 * )
 */
class Settting extends Model
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
    *     property="user_signup_active",
    *     description="Wheather or not new user's are allowed to signup",
    *     title="user_signup_active",
    *     type="boolean",
    * ),
    */

    public $timestamps = false;

    protected $fillable = [
        'user_signup_active'
    ];
}
