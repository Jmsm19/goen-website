<?php

namespace App;

use App\Period;
use Carbon\Carbon;
use Laravel\Passport\HasApiTokens;
use App\Http\Resources\ModuleResource;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @OA\Schema(
 *     title="User",
 *     description="User model",
 *     required={
 *          "id", "name", "national_id", "email",
 *          "password", "phone_number", "birth_date",
 *          "active", "registration_status"
 *     }
 * )
 */
class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, Notifiable, SoftDeletes;

    /**
    * @OA\Property(
    *     property="id",
    *     description="Unique identificator",
    *     title="id",
    *     type="integer",
    *     format="int64",
    * ),
    * @OA\Property(
    *     property="name",
    *     description="User name",
    *     title="name",
    *     type="string",
    * ),
    * @OA\Property(
    *     property="national_id",
    *     description="User's national identification",
    *     title="national_id",
    *     type="string",
    * ),
    * @OA\Property(
    *     property="email",
    *     description="User email",
    *     title="email",
    *     type="string",
    * ),
    * @OA\Property(
    *     property="password",
    *     description="User password",
    *     title="password",
    *     type="string",
    *     format="password",
    * ),
    * @OA\Property(
    *     property="phone_number",
    *     description="User phone number",
    *     title="phone_number",
    *     type="string",
    * ),
    * @OA\Property(
    *     property="birth_date",
    *     description="User birth date",
    *     title="birth_date",
    *     type="string",
    *     format="date",
    * ),
    * @OA\Property(
    *     property="active",
    *     description="User is active and has a confirmed email",
    *     title="active",
    *     type="boolean",
    * ),
     * @OA\Property(
     **   property="registration_status",
    *     description="Current registration status as a student of GOEN",
    *     title="registration_status",
    *     type="string",
    * )
    */


    protected $dates = [
        'deleted_at', 'birth_date'
    ];

    protected $fillable = [
        'name', 'national_id', 'email',
        'password', 'phone_number', 'birth_date',
        'active', 'activation_token', 'registration_status'
    ];

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

    public function hasClan()
    {
        return !is_null($this->clan);
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
        )->withPivot('status');
    }

    public function isStudentIn($module)
    {
        if ($this->modulesAsStudent()->where('module_id', $module->id)->first()) {
            return true;
        }

        return false;
    }

    public function isNotStudentIn($module)
    {
        return !$this->isStudentIn($module);
    }

    public function setRegistrationStatus($status)
    {
        return $this->update(['registration_status' => $status]);
    }

    /**
     * Register student in module
     * and update registration and module status for student
     * @param  \App\Module  $module
     * @return void
     */
    public function registerIn($module)
    {
        // Set relation
        $this->modulesAsStudent()->attach($module);
        $module->setModuleStatusFor($this, 'current');
        // Update status
        $this->setRegistrationStatus('paying');
    }

    public function isRegisteredInPeriodOf($module)
    {
        $qty_of_modules_where_is_registered = $this->modulesAsStudent()
                                            ->where('period_id', $module->period_id)
                                            ->count();
        return $qty_of_modules_where_is_registered === 1;
    }

    public function isNotWithinRegistrationThresholdOf($period)
    {
        // Normalized date, with time set to 00:00:00
        $today = Carbon::parse(Carbon::now()->format('Y-m-d'));

        // Compare dates only
        $is_earlier_than_start = $today->lt(Carbon::parse($period->signup_from));
        $is_later_than_end = $today->gt(Carbon::parse($period->signup_until));

        return $is_earlier_than_start || $is_later_than_end;
    }

    public function removeFrom($module)
    {
        $this->setRegistrationStatus('idle');
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

    public function currentModule()
    {
        return $this->modulesAsStudent()
                    ->wherePivot('status', 'current')->first();
    }

    public function previousModules()
    {
        $current_module = $this->currentModule();
        if ($current_module) {
            return $this->modulesAsStudent()
                ->where('module_id', '!=', $current_module->id)->get();
        }
        return $this->modulesAsStudent()->get();
    }

    public function passedModules()
    {
        return $this->modulesAsStudent()->where('status', 'passed')->get();
    }

    public function failedModules()
    {
        return $this->modulesAsStudent()->where('status', 'failed')->get();
    }
}
