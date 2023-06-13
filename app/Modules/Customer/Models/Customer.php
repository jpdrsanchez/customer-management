<?php

namespace App\Modules\Customer\Models;

use App\Modules\Customer\Casts\CPFCast;
use App\Modules\Customer\Enums\Gender;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasUuids;
    use HasFactory;

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts
        = [
            'birthdate' => 'immutable_datetime',
            'gender'    => Gender::class,
            'document'  => CPFCast::class
        ];
}
