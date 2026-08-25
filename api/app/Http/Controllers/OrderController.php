<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Services\OrderService;
use Exception;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $orders = Order::with('items.product')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    public function store(StoreOrderRequest $request, OrderService $orderService)
    {
        try {

            $order = $orderService->createOrder(
                $request->user()->id,
                $request->validated('endereco'),
                $request->validated('pagamento'),
                $request->validated('itens')
            );

            return response()->json([
                'message' => 'Pedido criado com sucesso!',
                'order' => $order
            ], 201);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
