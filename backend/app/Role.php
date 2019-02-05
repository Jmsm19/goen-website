<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     title="Role",
 *     description="Users possible roles in the platform",
 *     required={"id", "name", "description"}
 * )
 */
class Role extends Model
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
    *     description="Role name",
    *     title="name",
    *     type="string",
    * ),
    * @OA\Property(
    *     property="description",
    *     description="Role description",
    *     title="description",
    *     type="string",
    * )
    */

    protected $fillable = [
        'name', 'description'
    ];

    public function users()
    {
        return $this->belongsToMany('App\User')
                    ->withTimestamps();
    }
}
