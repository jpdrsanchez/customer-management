<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Modules\Customer\Models\Customer;

class CustomerController extends Controller
{
    public function index()
    {
        return Customer::all();
    }

    public function store(CustomerRequest $request)
    {
        return Customer::create($request->validated());
    }

    public function show(Customer $customer)
    {
        return $customer;
    }

    public function update(CustomerRequest $request, Customer $customer)
    {
        $customer->update($request->validated());

        return $customer;
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return response()->json();
    }
}
