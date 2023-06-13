<?php

namespace App\Modules\Customer\Casts;

use App\Modules\Customer\ValueObjects\CPF;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CPFCast implements CastsAttributes
{
    public function get(
        Model $model,
        string $key,
        mixed $value,
        array $attributes
    ): CPF {
        return CPF::create($value);
    }

    public function set(
        Model $model,
        string $key,
        mixed $value,
        array $attributes
    ): string {
        if (! $value instanceof CPF) {
            throw new HttpException(
                422,
                'The given value is not an CPF instance.'
            );
        }

        return $value->toPersistence();
    }
}
