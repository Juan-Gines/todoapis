<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\SwitchDatabase;

Route::get('/api/products', [ProductController::class, 'index'])->middleware(SwitchDatabase::class);

Route::post('/api/products', [ProductController::class, 'store'])->middleware(SwitchDatabase::class);

Route::patch('/api/products/{id}', [ProductController::class, 'update'])->middleware(SwitchDatabase::class);

Route::delete('/api/products/{id}', [ProductController::class, 'destroy'])->middleware(SwitchDatabase::class);

Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
