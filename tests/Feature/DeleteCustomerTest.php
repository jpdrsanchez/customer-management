<?php

use App\Modules\Customer\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(
    TestCase::class,
    RefreshDatabase::class
);

it(
    'should be able to update a customer without update the document.',
    function () {
        $updateRequest = [
            'name'     => 'John Doe',
            'document' => '95869586905',
            'city'     => 'Oswaldo Cruz'
        ];

        $customer = Customer::factory()->create();

        $response = $this->delete(
            '/api/customers/'.$customer->id
        );

        $response->assertStatus(204);

        $response = $this->get('/api/customers/'.$customer->id);

        $response->assertStatus(404);
    }
);
