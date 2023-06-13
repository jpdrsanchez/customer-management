<?php

use App\Modules\Customer\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(
    TestCase::class,
    RefreshDatabase::class
);

it('should be able to list a paginated list of customers', function () {
    Customer::factory(120)->create();

    $response = $this->get('api/customers');

    $response->assertStatus(200);
});
