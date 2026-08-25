<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\DB;

class OrderService
{
    public function createOrder(int $userId, array $shippingAddress, string $paymentMethod, array $itens)
    {
        //inicia uma transação
        return DB::transaction(function () use ($userId, $shippingAddress, $paymentMethod, $itens) {
            //define os valores iniciais das variáveis
            $totalAmount = 0;
            $processedItems = [];

            //passa por cada produto
            foreach ($itens as $item) {
                //acha o produto no banco pelo id passado
                $product = Product::findOrFail($item['id']);

                //confere o estoque
                if ($product->stock < $item['quantity']) {
                    throw new Exception("Estoque insuficiente para o produto: {$product->name}");
                }

                //calcula o valor total do pedido
                $totalAmount += ($product->price * $item['quantity']);

                //dados utilizados para criar o OrderItem
                $processedItems[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ];
            }

            //salva o pedido na tabela Orders
            $order = Order::create([
                'user_id' => $userId,
                'shipping_address' => $shippingAddress,
                'payment_method' => $paymentMethod,
                'total_amount' => $totalAmount,
                'status' => 'pendente',
            ]);

            //salva os itens do pedido no na tabela OrderItems
            foreach ($processedItems as $processedItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $processedItem['product']->id,
                    'quantity' => $processedItem['quantity'],
                    'price' => $processedItem['price'],
                ]);

                //reduz o estoque de acordo com a quantidade de produtos comprados
                $processedItem['product']->decrement('stock', $processedItem['quantity']);
            }

            return $order;
        });
    }
}
