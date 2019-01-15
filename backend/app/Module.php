<?php

namespace App;

use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = [
        'name', 'section', 'period_id', 'schedule_id', 'price_id',
        'clan_id', 'instructor_id', 'assistant_id'
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

    public function students()
    {
        return $this->belongsToMany(
            'App\User', // related model
            'module_student', // pivot table
            'module_id', // parent model foreign key
            'user_id', // related model pivot key
            'id', // key name of parent model
            'id', // key name of related model
            'students' // relation name
        );
    }

    public function getRegisteredStudents()
    {
        return $this->students()->count();
    }

    public function getRemainingSpaces()
    {
        return Config::get('constants.max_students_per_module') - $this->getRegisteredStudents();
    }

    public function canRegister($student)
    {
        return $this->getRemainingSpaces() > 0 && $student->isNotStudentIn($this->id);
    }

    public function instructor()
    {
        return $this->belongsTo('App\User', 'instructor_id', 'id');
    }

    public function assistant()
    {
        return $this->belongsTo('App\User', 'assistant_id', 'id');
    }
}
