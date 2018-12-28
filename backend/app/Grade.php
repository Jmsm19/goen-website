<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
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
