<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clan extends Model
{
    protected $fillable = [
        'name', 'picture'
    ];

    public function users()
    {
        return $this->hasMany('App\User');
    }
}
