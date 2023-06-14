<?php

namespace Database\Factories;

use App\Modules\Customer\Enums\Gender;
use App\Modules\Customer\Models\Customer;
use App\Modules\Customer\ValueObjects\CPF;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    public function definition(): array
    {
        return [
            'name'       => $this->faker->name(),
            'document'   => CPF::create(
                $this->faker
                    ->randomNumber(
                        7,
                        true
                    ).$this->faker
                    ->randomNumber(
                        4,
                        true
                    )
            ),
            'birthdate'  => CarbonImmutable::make(fake()->date(max: '2004-01-01')),
            'gender'     => $this->faker->randomElement(Gender::class),
            'address'    => $this->faker->address(),
            'state'      => $this->faker->word().$this->faker->word(),
            'city'       => $this->faker->city(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
