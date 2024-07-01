<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use MongoDB\Client;

class ProductController extends Controller
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client("mongodb://127.0.0.1:27017");
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (config('database.default') === 'mongodb') {
            $collection = $this->client->basket->products;
            return $collection->find()->toArray();
        }

        $prod = Product::all();
        return $prod->toJson();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
