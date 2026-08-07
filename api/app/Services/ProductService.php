<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Str;

class ProductService
{
    public function createProduct(array $data)
    {
        $data['user_id'] =

        $data['slug'] = Str::slug($data['name']);

        $data['is_active'] = $data['is_active'] ?? true;

        return Product::create($data);
    }
}
