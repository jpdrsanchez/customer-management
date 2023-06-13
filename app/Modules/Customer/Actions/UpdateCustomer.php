<?php

namespace App\Modules\Customer\Actions;

use App\Modules\Customer\Models\Customer;
use Illuminate\Support\Collection;

class UpdateCustomer
{
    public function execute(
        Collection $customerData,
        Customer $customer
    ): void {
        $customerData->each(function (mixed $value, string $key) use ($customer
        ) {
            $customer->{$key} = $value;
        });

        $customer->save();
    }
}
