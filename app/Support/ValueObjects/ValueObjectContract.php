<?php

namespace App\Support\ValueObjects;

interface ValueObjectContract
{
    public static function create(mixed $value): self;
}
