<?php
namespace App\Services;
use App\Models\Booking;
class BookingAvailability {
    // A hostel is a single unit in this MVP: any non-cancelled booking overlapping the dates blocks it.
    public static function isAvailable(int $hostelId, string $checkIn, string $checkOut, ?int $ignoreBookingId = null): bool {
        $q = Booking::where('hostel_id', $hostelId)->where('status', '!=', 'cancelled')
            ->where('check_in', '<', $checkOut)->where('check_out', '>', $checkIn);
        if ($ignoreBookingId) $q->where('id', '!=', $ignoreBookingId);
        return !$q->exists();
    }
}
