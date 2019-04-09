<?php

namespace App;

use Illuminate\Support\Facades\Config;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     title="Module",
 *     description="Module model",
 *     required={
 *      "id", "name", "section", "period_id", "schedule_id",
 *      "price_id", "instructor_id"
 *     }
 * )
 */
class Module extends Model
{
    /**
    * @OA\Property(
    *     description="Unique identificator",
    *     title="id",
    *     property="id",
    *     type="integer",
    *     format="int64",
    * ),
    * @OA\Property(
    *     description="Module name",
    *     property="name",
    *     type="string",
    *     title="name",
    * ),
    * @OA\Property(
    *     description="Module section",
    *     type="string",
    *     title="section",
    *     property="section",
    * ),
    * @OA\Property(
    *     description="Period to whom the module belongs",
    *     title="period_id",
    *     type="integer",
    *     format="int64",
    *     property="period_id",
    * ),
    * @OA\Property(
    *     description="Schedule where the module takes places.",
    *     title="schedule_id",
    *     type="integer",
    *     format="int64",
    *     property="schedule_id",
    * ),
    * @OA\Property(
    *     description="Price to register in module.",
    *     type="integer",
    *     title="price_id",
    *     format="int64",
    *     property="price_id",
    * ),
    * @OA\Property(
    *     description="If M0, the module needs a clan to give new students.",
    *     type="integer",
    *     title="clan_id",
    *     format="int64",
    *     property="clan_id",
    * ),
    * @OA\Property(
    *     description="Instructor in charge of the module.",
    *     type="integer",
    *     title="instructor_id",
    *     format="int64",
    *     property="instructor_id",
    * ),
    * @OA\Property(
    *     description="Instructor's assistant in the module.",
    *     type="integer",
    *     title="assistant_id",
    *     format="int64",
    *     property="assistant_id",
    * )
    */

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
        )->withPivot('status');
    }

    public function getRegisteredStudents()
    {
        return $this->students()->count();
    }

    public function getRemainingSpaces()
    {
        return Config::get('constants.max_students_per_module') - $this->getRegisteredStudents();
    }

    public function hasSpace()
    {
        return $this->getRemainingSpaces() > 0;
    }

    /**
     * Checks if module is correct for student according to module order.
     * Returns an array with a bool [0] and next module name [1]
     * @param \App\User $student
     * @return Array
     */
    public function isCorrectFor($student)
    {
        $taken_modules = [];
        $passed_modules = $student->passedModules();
        $module_order = config('constants.module_order');

        for ($i=0; $i < count($passed_modules); $i++) {
            $module_number = explode('-', $passed_modules[$i]->name)[1];
            $taken_modules[$module_number] = $passed_modules[$i]->name;
        }

        $not_taken_modules = array_diff($module_order, $taken_modules);
        $next_module = array_shift($not_taken_modules);

        return [$this->name === $next_module, $next_module];
    }

    public function instructor()
    {
        return $this->belongsTo('App\User', 'instructor_id', 'id');
    }

    public function assistant()
    {
        return $this->belongsTo('App\User', 'assistant_id', 'id');
    }

    public function setModuleStatusFor($student, $status)
    {
        // When new status is current, set all previous Modules with that status to be failed
        if ($status == 'current') {
            $this->setAllCurrentModulesToFailedFor($student);
        }

        return $this->students()->updateExistingPivot($student->id, ['status' => $status]);
    }

    public function setAllCurrentModulesToFailedFor($student)
    {
        $student->modulesAsStudent()
                ->newPivotStatement()
                ->where([
                    'status' => 'current'
                ])->update(['status' => 'failed']);
    }
}
