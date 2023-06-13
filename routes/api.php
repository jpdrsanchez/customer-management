<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpKernel\Exception\HttpException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::name('api.')->group(function () {
    Route::apiResource(
        'customers',
        CustomerController::class
    )
         ->whereUuid('customer')
         ->missing(function () {
             throw new HttpException(
                 404,
                 'The provided customer could not be found'
             );
         });
});
