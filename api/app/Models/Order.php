<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_amount',
        'payment_method',
        'shipping_address',
        'status',
    ];

    protected $casts = [
        'shipping_address' => 'array',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
