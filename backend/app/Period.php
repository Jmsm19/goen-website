<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     title="Period",
 *     description="Period model",
 *     required={
 *      "id", "name", "year", "active",
 *      "signup_from", "signup_until"
 *     }
 * )
 */
class Period extends Model
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
    *     description="Period name",
    *     title="name",
    *     type="string",
    * ),
    * @OA\Property(
    *     property="year",
    *     description="Period's year",
    *     title="year",
    *     type="string",
    * ),
    * @OA\Property(
    *     property="active",
    *     description="Is period currently ongoing",
    *     title="active",
    *     type="boolean",
    * ),
    * @OA\Property(
    *     property="signup_from",
    *     description="Period registration start date. YYYY-MM-DD",
    *     title="signup_from",
    *     type="string",
    *     format="date",
    * ),
    * @OA\Property(
    *     property="signup_until",
    *     description="Period registration finish date. YYYY-MM-DD",
    *     title="signup_until",
    *     type="string",
    *     format="date",
    * ),
    * @OA\Property(
    *     property="modules",
    *     description="Period modules",
    *     type="array",
    *     title="modules",
    *     @OA\Items(ref="#/components/schemas/Module")
    * )
    */

    protected $fillable = [
        'name', 'year', 'active', 'signup_from', 'signup_until'
    ];

    public function modules()
    {
        return $this->hasMany('App\Module');
    }

    public function makeCurrent()
    {
        $previous_active_periods = Period::where('active', 1);
        if (!empty($previous_active_periods)) {
            $previous_active_periods->update(['active' => false]);
        }
        // $this->update(['active' => true]);
        $this->active = true;
        $this->save();
    }
}
