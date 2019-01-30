<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    protected $fillable = [
        'name', 'year', 'active', 'signup_from', 'signup_until'
    ];

    public function module()
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
