<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductMongo;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (config('database.default') === 'mongodb') {

            return ProductMongo::all()->toArray();
        }

        return Product::all()->toJson();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
        ]);


        if (config('database.default') === 'mongodb') {
            $product = new ProductMongo();
        } else {
            $product = new Product();
        }

        $product->created($request->all());
        $product->save();
        return $this->index();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'onbasket' => 'required|boolean',
        ]);

        if (config('database.default') === 'mongodb') {
            $product = ProductMongo::find($id);
        } else {
            $product = Product::find($id);
        }

        $product->update($request->all());
        $product->save();
        return $this->index();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if (config('database.default') === 'mongodb') {
            $product = ProductMongo::find($id);
        } else {
            $product = Product::find($id);
        }
        $product->delete();
        return $this->index();
    }
}
