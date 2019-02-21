<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     title="Schedule",
 *     description="Modules possible schedule",
 *     required={"id", "day", "from", "until"}
 * )
 */
class Schedule extends Model
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
    *     property="day",
    *     description="Day in which the class takes places",
    *     title="day",
    *     type="string",
    *     format="date",
    * ),
    * @OA\Property(
    *     property="from",
    *     description="Start time of the class. HH:MM:SS",
    *     title="from",
    *     type="string",
    * ),
    * @OA\Property(
    *     property="until",
    *     description="Time in which the class ends. HH:MM:SS",
    *     title="until",
    *     type="string",
    * )
    */

    protected $fillable =[
        'day','from', 'until'
    ];

    public function modules()
    {
        return $this->hasMany('App\Module');
    }
}
