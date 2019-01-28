<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SimplePeriodResource extends JsonResource
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
            'signupFrom' => $this->signup_from,
            'signupUntil' => $this->signup_until,
        ];
    }
}
