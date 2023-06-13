<?php

use App\Modules\Customer\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(
    TestCase::class,
    RefreshDatabase::class
);

it(
    'should be able to find a valid customer stored in the database',
    function () {
        $customer = Customer::factory()->create();

        $response = $this->get('/api/customers/'.$customer->id);

        $response->assertStatus(200)->assertJson([
            'id'         => $customer->id,
            'gender'     => $customer->gender->value,
            'document'   => $customer->document->value,
            'birthdate'  => $customer->birthdate->jsonSerialize(),
            'address'    => $customer->address,
            'state'      => $customer->state,
            'city'       => $customer->city,
            'created_at' => $customer->created_at->jsonSerialize(),
            'updated_at' => $customer->updated_at->jsonSerialize()
        ]);
    }
);

it(
    'should not be able to find a valid customer stored in the database',
    function () {
        $customer = Customer::factory()->create();

        $customer->delete();

        $response = $this->get('/api/customers/'.$customer->id);

        $response->assertStatus(404);
    }
);
