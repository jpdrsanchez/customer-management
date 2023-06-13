<?php

namespace App\Modules\Customer\ValueObjects;

use App\Support\ValueObjects\ValueObjectContract;
use Nette\SmartObject;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * @property string $value
 */
class CPF implements ValueObjectContract
{
    use SmartObject;

    private function __construct(private readonly string $value)
    {
    }

    /**
     * @param  mixed  $value
     *
     * @return CPF
     */
    public static function create(mixed $value): CPF
    {
        $sanitizedValue = self::sanitize((string) $value);
        if (! self::validate($sanitizedValue)) {
            throw new HttpException(422, 'The provided document is invalid');
        }

        return new self($sanitizedValue);
    }

    protected static function sanitize(string $value): string
    {
        return preg_replace('/\D/', '', $value);
    }

    protected static function validate(mixed $value): bool
    {
        return strlen($value) === 11;
    }

    public function getValue(): string
    {
        return preg_replace(
            '/(\d{3})(\d{3})(\d{3})(\d{2})/',
            '$1.$2.$3-$4',
            $this->value
        );
    }

    public function toPersistence(): string
    {
        return $this->value;
    }
}
