<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreBookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Hostel;
use App\Services\BookingAvailability;
use App\Services\BookingPricing;
use Illuminate\Http\Request;
class BookingController extends Controller {
    public function store(StoreBookingRequest $r) {
        $data = $r->validated();
        $hostel = Hostel::findOrFail($data['hostel_id']);
        if (!BookingAvailability::isAvailable($hostel->id, $data['check_in'], $data['check_out'])) {
            return response()->json(['message' => 'This hostel is already booked for those dates.'], 422);
        }
        $pricing = BookingPricing::calculate($hostel->price_per_day_mad, $data['check_in'], $data['check_out']);
        $booking = Booking::create([...$data, 'payment_method' => $data['payment_method'] ?? 'cash', 'user_id' => $r->user()->id, 'total_mad' => $pricing['total_mad'], 'commission_mad' => $pricing['commission_mad'], 'status' => 'pending']);
        return (new BookingResource($booking->load('hostel')))->response()->setStatusCode(201);
    }
    public function cancel(Request $r, Booking $booking) {
        if ($booking->user_id !== $r->user()->id) return response()->json(['message' => 'Forbidden'], 403);
        if ($booking->status === 'cancelled') return response()->json(['message' => 'Already cancelled'], 422);
        $booking->update(['status' => 'cancelled']);
        return new BookingResource($booking->load('hostel'));
    }
    public function mine(Request $r) { return BookingResource::collection(Booking::with('hostel')->where('user_id', $r->user()->id)->latest()->get()); }
}
