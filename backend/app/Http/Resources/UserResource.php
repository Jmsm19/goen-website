<?php

namespace App\Http\Resources;

use App\Http\Resources\SimpleModuleResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $has_clan = !is_null($this->clan);
        $current_module = $this->getCurrentModule();
        $previous_modules = $this->getPreviousModules();

        return [
            'id' => $this->id,
            'nationalId' => $this->national_id,
            'name' => $this->name,
            'email' => $this->email,
            'phoneNumber' => $this->phone_number,
            'birthDate' => (string) $this->birth_date,
            'clan' => $has_clan ? $this->clan->name : null,
            'registrationStatus' => $this->registration_status,
            'currentModule' => is_null($current_module) ?
                null : new SimpleModuleResource($current_module),
            'previousModules' => count($previous_modules) == 0 ?
                [] : SimpleModuleResource::collection($previous_modules),
            'isAdmin' => $this->hasRole('admin'),
            'isInstructor' => $this->hasRole('instructor'),
            'isAssistant' => $this->hasRole('assistant'),
            'isStudent' => $this->hasRole('student'),
        ];
    }
}
