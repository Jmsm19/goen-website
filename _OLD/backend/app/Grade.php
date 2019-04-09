<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     title="Grade",
 *     description="Grade model",
 *     required={"id", "score", "module_id", "user_id"}
 * )
 */
class Grade extends Model
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
    *     property="score",
    *     description="User's score in module",
    *     title="score",
    *     type="number",
    *     format="double",
    * ),
    * @OA\Property(
    *     property="module_id",
    *     description="Module in which the user got the score.",
    *     title="module_id",
    *     type="integer",
    *     format="int64",
    * ),
    * @OA\Property(
    *     property="user_id",
    *     description="User to whom the score belongs.",
    *     title="user_id",
    *     type="integer",
    *     format="int64",
    * )
    */

    protected $fillable = [
        'score', 'module_id', 'user_id'
    ];

    public function module()
    {
        return $this->belongsTo('App\Module');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
