<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    protected $fillable = [
        'name', 'year', 'signup_from', 'signup_until'
    ];

    public function module()
    {
        return $this->hasMany('App\Module');
    }
}
