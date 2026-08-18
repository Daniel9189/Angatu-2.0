<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Services\OrderService;
use Exception;

class OrderController extends Controller
{
    public function store(StoreOrderRequest $request, OrderService $orderService)
    {
        try {

            $userId = $request->user()->id;

            $items = $request->validated('items');

            $order = $orderService->createOrder(
                $userId,
                $items
            );

            return response()->json($order, 201);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
