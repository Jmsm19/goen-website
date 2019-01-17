<?php

namespace App\Http\Resources;

use App\Http\Resources\ScheduleResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ModuleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'section' => $this->section,
            'price' => $this->price->amount,
            'clan' => is_null($this->clan) ? null : $this->clan->name,
            'schedule' => new ScheduleResource($this->schedule),
            'registeredStudents' => $this->getRegisteredStudents(),
            'availableSpaces' => $this->getRemainingSpaces(),
        ];
    }
}
