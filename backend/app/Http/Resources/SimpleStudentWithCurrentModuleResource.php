<?php

namespace App\Http\Resources;

use App\Http\Resources\SimpleModuleResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SimpleStudentWithCurrentModuleResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'phoneNumber' => $this->phone_number,
            'clan' => $has_clan ? $this->clan->name : null,
            'registrationStatus' => $this->registration_status,
            'currentModule' => new SimpleModuleResource($this->currentModule())
        ];
    }
}
