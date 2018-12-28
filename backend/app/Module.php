<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = [
        'name', 'period_id'
    ];

    public function period()
    {
        return $this->belongsTo('App\Period');
    }

    public function grades()
    {
        return $this->hasMany('App\Grade');
    }
}
