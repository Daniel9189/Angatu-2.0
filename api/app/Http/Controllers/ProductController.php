<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::where('is_active', true)->paginate(12);

        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request, ProductService $productService)
    {
        $validatedData = $request->validated();

        $product = $productService->createProduct($validatedData);
        
        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $product = Product::where('slug', $slug)->where('is_active', true)->firstOrFail();

        return response()->json($product);
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
