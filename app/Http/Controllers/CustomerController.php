<?php

namespace App\Http\Controllers;

use App\Http\Resources\CreateCustomerResource;
use App\Http\Resources\ShowCustomerResource;
use App\Modules\Customer\Actions\CreateCustomer;
use App\Modules\Customer\Actions\ListCustomers;
use App\Modules\Customer\Actions\UpdateCustomer;
use App\Modules\Customer\Data\CreateCustomerData;
use App\Modules\Customer\Data\CustomerSearchData;
use App\Modules\Customer\Data\UpdateCustomerData;
use App\Modules\Customer\Models\Customer;

class CustomerController extends Controller
{
    public function __construct(
        private readonly CreateCustomer $createCustomer,
        private readonly ListCustomers $listCustomers,
        private readonly UpdateCustomer $updateCustomer
    ) {
    }

    public function index(CustomerSearchData $request)
    {
        $customers = $this->listCustomers->execute(collect($request->all()));

        return ShowCustomerResource::collection($customers);
    }

    public function store(CreateCustomerData $request)
    {
        $customer = $this->createCustomer->execute($request);

        return new CreateCustomerResource($customer);
    }

    public function show(Customer $customer)
    {
        return new ShowCustomerResource($customer);
    }

    public function update(UpdateCustomerData $request, Customer $customer)
    {
        $this->updateCustomer->execute(collect($request->all()), $customer);

        return response()->noContent();
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return response()->noContent();
    }
}
