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

        expect($customer->name)
            ->not->toBe($updateRequest["name"])
                 ->and($customer->document->toPersistence())
            ->not->toBe($updateRequest["document"])
                 ->and($customer->city)
            ->not->toBe($updateRequest["city"]);

        $response = $this->putJson(
            '/api/customers/'.$customer->id,
            $updateRequest
        );
        $response->assertStatus(204);

        $customer->refresh();

        expect($customer->name)
            ->toBe($updateRequest["name"])
            ->and($customer->document->toPersistence())
            ->not->toBe($updateRequest["document"])
                 ->and($customer->city)
                 ->toBe($updateRequest["city"]);
    }
);
