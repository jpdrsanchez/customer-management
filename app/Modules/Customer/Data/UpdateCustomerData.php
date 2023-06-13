<?php

namespace App\Modules\Customer\Data;

use App\Modules\Customer\Enums\Gender;
use Carbon\CarbonImmutable;
use Illuminate\Validation\Rules\Enum;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class UpdateCustomerData extends Data
{
    public function __construct(
        public string|Optional $name,
        public Gender|Optional $gender,
        public CarbonImmutable|Optional $birthdate,
        public string|Optional $address,
        public string|Optional $state,
        public string|Optional $city
    ) {
    }

    public static function rules(): array
    {
        return [
            'name'      => ['sometimes', 'string', 'min:3'],
            'birthdate' => ['sometimes', 'date_format:Y-m-d'],
            'gender'    => ['sometimes', new Enum(Gender::class)],
            'address'   => ['sometimes', 'string', 'min:5'],
            'state'     => ['sometimes', 'string', 'min:5'],
            'city'      => ['sometimes', 'string', 'min:5'],
        ];
    }
}
