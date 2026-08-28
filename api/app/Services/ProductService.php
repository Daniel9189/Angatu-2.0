<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductService
{
    public function createProduct(string $userId, array $data, array $images)
    {
        return DB::transaction(function () use ($userId, $data, $images) {
            $product = Product::create([
                'user_id' => $userId,
                'name' => $data['name'],
                'slug' => Str::slug($data['name']).'-'.mt_rand(10000, 99999),
                'description' => $data['description'],
                'price' => $data['price'],
                'stock' => $data['stock'],
                'is_active' => $data['is_active'] ?? true
            ]);

            if ($images) {
                foreach ($images as $image) {
                    $path = $image->store('products', 'public');
                    $product->images()->create([
                        'image_path' => $path
                    ]);
                }
            }

            return $product;
        });
    }
}
