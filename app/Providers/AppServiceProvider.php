<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Factory::guessFactoryNamesUsing(fn(string $modelName
        ) => "Database\\Factories\\".class_basename($modelName)."Factory");
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();
    }
}
