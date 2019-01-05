<?php

namespace App\Http\Resources;

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
        return [
            'id' => $this->id,
            'national_id' => $this->national_id,
            'name' => $this->name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'birth_date' => (string) $this->birth_date,
            'clan' => $has_clan ? $this->clan->name : null,
            'is_admin' => $this->hasRole('admin'),
            'is_instructor' => $this->hasRole('instructor'),
            'is_assistant' => $this->hasRole('assistant'),
            'is_student' => $this->hasRole('student'),
        ];
    }
}
