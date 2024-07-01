<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\SwitchDatabase;

Route::get('/api/products', [ProductController::class, 'index'])->middleware(SwitchDatabase::class);
Route::get('test-mongo', function () {
    $client = new MongoDB\Client("mongodb://127.0.0.1:27017");
    $collection = $client->basket->products;
    return $collection->find()->toArray();
})->middleware(SwitchDatabase::class);
