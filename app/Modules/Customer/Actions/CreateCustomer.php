<?php

namespace App\Modules\Customer\Actions;

use App\Modules\Customer\Data\CreateCustomerData;
use App\Modules\Customer\Models\Customer;

class CreateCustomer
{
    public function execute(CreateCustomerData $customerData): Customer
    {
        $customer = new Customer();

        $customer->name      = $customerData->name;
        $customer->document  = $customerData->document;
        $customer->gender    = $customerData->gender;
        $customer->birthdate = $customerData->birthdate;
        $customer->address   = $customerData->address;
        $customer->state     = $customerData->state;
        $customer->city      = $customerData->city;

        $customer->save();


        return $customer;
    }
}
