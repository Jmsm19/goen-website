<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    protected $fillable = [
        'amount'
    ];

    public function modules()
    {
        return $this->hasMany('App\Module');
    }
}
