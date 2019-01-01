<?php

namespace App\Listeners;

use App\Role;
use Illuminate\Auth\Events\Verified;
use Illuminate\Contracts\Queue\ShouldQueue;

class AssignStudentRole implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
    }

    /**
     * Handle the event.
     *
     * @param \Illuminate\Auth\Events\Registered $event
     */
    public function handle(Verified $event)
    {
        $user = $event->user;
        $student_role = Role::where('name', 'student')->first();
        $user->roles()->attach($student_role);
        // Save updated User model
        $user->save();
    }
}
