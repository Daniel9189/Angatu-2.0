<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\DB;

class OrderService
{
    public function createOrder(int $userId, array $items)
    {
        return DB::transaction(function () use ($userId, $items) {
            $totalAmount = 0;
            $processedItems = [];

            foreach ($items as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    throw new Exception("Estoque insuficiente para o produto: {$product->name}");
                }

                $totalAmount += ($product->price * $item['quantity']);

                $processedItems[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ];
            }

            $order = Order::create([
                'user_id' => $userId,
                'total_amount' => $totalAmount,
                'status' => 'completed',
            ]);

            foreach ($processedItems as $processedItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $processedItem['product']->id,
                    'quantity' => $processedItem['quantity'],
                    'price' => $processedItem['price'],
                ]);

                $processedItem['product']->decrement('stock', $processedItem['quantity']);
            }

            return $order;
        });
    }
}
