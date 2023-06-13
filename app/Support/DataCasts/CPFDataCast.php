<?php

namespace App\Support\DataCasts;

use App\Modules\Customer\ValueObjects\CPF;
use Spatie\LaravelData\Casts\Cast;
use Spatie\LaravelData\Support\DataProperty;

class CPFDataCast implements Cast
{
    public function cast(
        DataProperty $property,
        mixed $value,
        array $context
    ): CPF {
        return CPF::create($value);
    }
}
