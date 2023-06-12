<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'      => ['required'],
            'document'  => ['required'],
            'birthdate' => ['required'],
            'gender'    => ['required'],
            'address'   => ['required'],
            'state'     => ['required'],
            'city'      => ['required'],
        ];
    }
}
