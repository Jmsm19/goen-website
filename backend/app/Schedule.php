<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable =[
        'start_date','from', 'until'
    ];

    public function modules()
    {
        return $this->hasMany('App\Module');
    }
}
