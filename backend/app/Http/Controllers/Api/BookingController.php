<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreBookingRequest;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Hostel;
use Carbon\Carbon;
use Illuminate\Http\Request;
class BookingController extends Controller {
    public const SERVICE_FEE_MAD = 35;
    public const COMMISSION_RATE = 0.12;
    public function store(StoreBookingRequest $r) {
        $data = $r->validated();
        $hostel = Hostel::findOrFail($data['hostel_id']);
        $nights = max(1, Carbon::parse($data['check_in'])->diffInDays(Carbon::parse($data['check_out'])));
        $subtotal = $hostel->price_per_day_mad * $nights;
        $total = $subtotal + self::SERVICE_FEE_MAD;
        $booking = Booking::create([...$data, 'user_id' => $r->user()->id, 'total_mad' => $total, 'commission_mad' => (int) round($subtotal * self::COMMISSION_RATE), 'status' => 'pending']);
        return (new BookingResource($booking->load('hostel')))->response()->setStatusCode(201);
    }
    public function mine(Request $r) { return BookingResource::collection(Booking::with('hostel')->where('user_id', $r->user()->id)->latest()->get()); }
}
