<?php

namespace App\Http\Resources;

use App\Http\Resources\ModuleResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PeriodResource extends JsonResource
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
            'year' => $this->year,
            'name' => $this->name,
            'active' => (boolean) $this->active,
            'modules' => ModuleResource::collection($this->module)
        ];
    }
}
