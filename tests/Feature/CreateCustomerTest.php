<?php

use App\Modules\Customer\Enums\Gender;
use App\Modules\Customer\Models\Customer;
use App\Modules\Customer\ValueObjects\CPF;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

it('should be able to create a valid customer', function () {
    $response = $this->postJson('/api/customers', [
        'name'      => fake()->name(),
        'gender'    => fake()->randomElement(Gender::cases()),
        'document'  => fake()->randomNumber(9, true).fake()->randomNumber(
            2,
            true
        ),
        'birthdate' => fake()->date(),
        'address'   => fake()->address(),
        'state'     => fake()->word().fake()->word(),
        'city'      => fake()->city(),
    ]);

    $customer = Customer::first();

    expect($customer)->toBeInstanceOf(Customer::class);

    $response->assertStatus(201)->assertJson([
        'message'  => 'Customer created successfully',
        'customer' => [
            'id'         => $customer->id,
            'name'       => $customer->name,
            'document'   => $customer->document->value,
            'birthdate'  => $customer->birthdate->jsonSerialize(),
            'address'    => $customer->address,
            'state'      => $customer->state,
            'city'       => $customer->city,
            'created_at' => $customer->created_at->jsonSerialize(),
            'updated_at' => $customer->updated_at->jsonSerialize(),
        ]
    ]);
});

it(
    'should not be able to create a customer with a document already stored in the database',
    function () {
        $document = '45840596895';

        Customer::factory()->create([
            'document' => CPF::create($document)
        ]);

        $response = $this->postJson('/api/customers', [
            'name'      => fake()->name(),
            'gender'    => fake()->randomElement(Gender::cases()),
            'document'  => $document,
            'birthdate' => fake()->date(),
            'address'   => fake()->address(),
            'state'     => fake()->word().fake()->word(),
            'city'      => fake()->city(),
        ]);

        $response->assertStatus(422);
    }
);
