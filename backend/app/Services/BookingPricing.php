<?php
namespace App\Services;
use Carbon\Carbon;
class BookingPricing {
    public const SERVICE_FEE_MAD = 35;
    public const COMMISSION_RATE = 0.12;
    public static function nights(string $checkIn, string $checkOut): int {
        return max(1, Carbon::parse($checkIn)->diffInDays(Carbon::parse($checkOut)));
    }
    public static function calculate(int $pricePerDay, string $checkIn, string $checkOut): array {
        $nights = self::nights($checkIn, $checkOut);
        $subtotal = $pricePerDay * $nights;
        return [
            'nights' => $nights,
            'subtotal_mad' => $subtotal,
            'service_fee_mad' => self::SERVICE_FEE_MAD,
            'total_mad' => $subtotal + self::SERVICE_FEE_MAD,
            'commission_mad' => (int) round($subtotal * self::COMMISSION_RATE),
        ];
    }
}
