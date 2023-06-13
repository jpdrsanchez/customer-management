<?php

namespace App\Http\Resources;

use App\Modules\Customer\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Customer */
class ShowCustomerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'name'       => $this->name,
            'document'   => $this->document->value,
            'birthdate'  => $this->birthdate,
            'gender'     => $this->gender,
            'address'    => $this->address,
            'state'      => $this->state,
            'city'       => $this->city,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
