<?php

namespace App\Modules\Customer\Actions;

use App\Modules\Customer\Models\Customer;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class ListCustomers
{
    public function execute(Collection $request): LengthAwarePaginator
    {
        $customers = Customer::query();
        $request->each(function (mixed $value, string $key) use ($customers) {
            match ($key) {
                'page', 'perPage' => null,
                'name' => $customers->where($key, 'like', "%$value%"),
                'birthdate' => $customers->whereDate($key, $value),
                default => $customers->where($key, $value)
            };
        });

        $page    = $request->has('page') && $request->get('page')
            ? $request->get('page') : 1;
        $perPage = $request->has('perPage') && $request->get('perPage')
            ? $request->get('perPage')
            : 15;

        return $customers->paginate(
            perPage: (int) $perPage,
            page: (int) $page
        );
    }
}
