<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Str;

class ProductService
{
    public function createProduct(string $userId, array $data)
    {

        $data['user_id'] = $userId;
    
        $data['slug'] = Str::slug($data['name']);

        $data['is_active'] = $data['is_active'] ?? true;

        return Product::create($data);
    }
}
