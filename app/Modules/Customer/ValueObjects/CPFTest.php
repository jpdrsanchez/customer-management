<?php

use App\Modules\Customer\ValueObjects\CPF;

it(
    'should be able to create a valid cpf value object',
    function (string $value) {
        $document = CPF::create($value);

        expect($document)
            ->toBeInstanceOf(CPF::class)
            ->and($document->value)->toBe(preg_replace(
                '/(\d{3})(\d{3})(\d{3})(\d{2})/',
                '$1.$2.$3-$4',
                $value
            ))->and($document->toPersistence())
            ->toBe(preg_replace('/\D/', '', $value));
    }
)->with([
    '49876548789',
    '59659869509',
    '288.489.546-55'
]);

it(
    'should not be able to create a valid cpf value object',
    function (string $value) {
        CPF::create($value);
    }
)->with([
    '4837564',
    'dummy string',
    '0.01'
])->throws(\Symfony\Component\HttpKernel\Exception\HttpException::class);
