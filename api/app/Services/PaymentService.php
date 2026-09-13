<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Str;

class PaymentService
{
    public function generatePix(Order $order): array
    {
        $transactionId = 'TX-' . strtoupper(Str::random(12));
        $simulatedPixCode = "00020126580014br.gov.bcb.pix0136" . Str::uuid() . "5204000053039865802BR5913Angatu Store6008Salvador62070503***6304" . strtoupper(Str::random(4));

        $order->update([
            'payment_method' => 'pix',
            'payment_status' => 'pendente',
            'transaction_id' => $transactionId,
            'pix_code' => $simulatedPixCode
        ]);

        return [
            'transactionId' => $transactionId,
            'pix_code' => $simulatedPixCode,
            'expires_at' => now()-> addMinutes(30)->toIso8601String()
        ];
    }

    public function processCreditCard(Order $order, array $cardData): bool {
        $cardNumber = preg_replace('/\D/', '', $cardData['number'] ?? '');
        $isApproved = !str_ends_with($cardNumber, '0000');

        $order->update([
            'payment_method' => 'credit_card',
            'payment_status' => $isApproved ? 'paid' : 'failed',
            'transaction_id' => 'TX-' . strtoupper(Str::random(12))
        ]);
        
        return $isApproved;
    }
}
