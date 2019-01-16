<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, Notifiable, SoftDeletes;

    protected $dates = [
        'deleted_at', 'birth_date'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'national_id', 'email',
        'password', 'phone_number', 'birth_date',
        'active', 'activation_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'activation_token',
    ];

    public function roles()
    {
        return $this->belongsToMany('App\Role')
                    ->withTimestamps();
    }

    public function hasAnyRole($roles)
    {
        if (is_array($roles)) {
            foreach ($roles as $role) {
                if ($this->hasRole($role)) {
                    return true;
                }
            }
        } else {
            if ($this->hasRole($roles)) {
                return true;
            }
        }
        return false;
    }

    public function hasRole($role)
    {
        if ($this->roles()->where('name', $role)->first()) {
            return true;
        }
        return false;
    }

    public function clan()
    {
        return $this->belongsTo('App\Clan');
    }

    public function grades()
    {
        return $this->hasMany('App\Grade');
    }

    public function modulesAsStudent()
    {
        return $this->belongsToMany(
            'App\Module', // related model
            'module_student', // pivot table
            'user_id', // parent model foreign key
            'module_id', // related model pivot key
            'id', // key name of parent model
            'id', // key name of related model
            'students' // relation name
        );
    }

    public function isStudentIn($module)
    {
        if ($this->modulesAsStudent()->where('module_id', $module)->first()) {
            return true;
        }
        return false;
    }

    public function isNotStudentIn($module)
    {
        return !$this->isStudentIn($module);
    }

    public function registerIn($module)
    {
        return $this->modulesAsStudent()->attach($module);
    }

    public function isRegisteredInPeriodOf($module)
    {
        $qty_of_modules_where_is_registered = $this->modulesAsStudent()
                                            ->where('period_id', $module->period_id)
                                            ->count();
        return $qty_of_modules_where_is_registered === 1;
    }

    public function removeFrom($module)
    {
        return $this->modulesAsStudent()->detach($module);
    }


    public function modulesAsInstructor()
    {
        return $this->hasMany('App\Module', 'instructor_id', 'id');
    }

    public function isInstructorIn($module)
    {
        if ($this->modulesAsInstructor()->where('id', $module)->first()) {
            return true;
        }
        return false;
    }

    public function isNotInstructorIn($module)
    {
        return !$this->isInstructorIn($module);
    }

    public function modulesAsAssistant()
    {
        return $this->hasMany('App\Module', 'assistant_id', 'id');
    }

    public function isAssistantIn($module)
    {
        if ($this->modulesAsAssistant()->where('id', $module)->first()) {
            return true;
        }
        return false;
    }

    public function isNotAssistantIn($module)
    {
        return !$this->isAssistantIn($module);
    }
}
