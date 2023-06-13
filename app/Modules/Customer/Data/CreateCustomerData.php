<?php

namespace App\Modules\Customer\Data;

use App\Modules\Customer\Enums\Gender;
use App\Modules\Customer\ValueObjects\CPF;
use App\Support\DataCasts\CPFDataCast;
use Carbon\CarbonImmutable;
use Illuminate\Validation\Rules\Enum;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Data;

class CreateCustomerData extends Data
{
    public function __construct(
        public string $name,
        public Gender $gender,
        #[WithCast(CPFDataCast::class)]
        public CPF $document,
        public CarbonImmutable $birthdate,
        public string $address,
        public string $state,
        public string $city
    ) {
    }

    public static function rules(): array
    {
        return [
            'name'      => ['required', 'string', 'min:3'],
            'document'  => [
                'required',
                'string',
                'numeric',
                'digits:11',
                'unique:customers,document'
            ],
            'birthdate' => ['required', 'date_format:Y-m-d'],
            'gender'    => ['required', new Enum(Gender::class)],
            'address'   => ['required', 'string', 'min:5'],
            'state'     => ['required', 'string', 'min:3'],
            'city'      => ['required', 'string', 'min:5'],
        ];
    }
}
