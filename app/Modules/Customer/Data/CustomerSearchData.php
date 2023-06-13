<?php

namespace App\Modules\Customer\Data;

use App\Modules\Customer\Enums\Gender;
use Illuminate\Validation\Rules\Enum;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class CustomerSearchData extends Data
{
    public function __construct(
        public int|Optional $page,
        #[MapInputName('per_page')]
        public int|Optional $perPage,
        public string|Optional $name,
        public string|Optional $document,
        public string|Optional $gender,
        public string|Optional $birthdate,
        public string|Optional $state,
        public string|Optional $city
    ) {
    }

    public static function rules(): array
    {
        return [
            'page'      => ['sometimes', 'integer'],
            'per_page'  => ['sometimes', 'integer'],
            'name'      => ['sometimes', 'string'],
            'document'  => [
                'sometimes',
                'string',
                'numeric',
                'digits:11'
            ],
            'birthdate' => ['sometimes', 'date_format:Y-m-d'],
            'gender'    => ['sometimes', new Enum(Gender::class)],
            'address'   => ['sometimes', 'string'],
            'state'     => ['sometimes', 'string'],
            'city'      => ['sometimes', 'string'],
        ];
    }
}
