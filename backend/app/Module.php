<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = [
        'name', 'section', 'period_id', 'schedule_id', 'price_id', 'clan_id'
    ];

    public function period()
    {
        return $this->belongsTo('App\Period');
    }

    public function grades()
    {
        return $this->hasMany('App\Grade');
    }

    public function schedule()
    {
        return $this->belongsTo('App\Schedule');
    }

    public function price()
    {
        return $this->belongsTo('App\Price');
    }

    public function clan()
    {
        return $this->belongsTo('App\Clan');
    }
}
