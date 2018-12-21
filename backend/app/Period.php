<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    protected $fillable = [
        'name', 'year'
    ];

    public function module()
    {
        return $this->hasMany('App\Module');
    }
}
