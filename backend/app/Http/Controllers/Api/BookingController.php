<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Hostel;
use Illuminate\Http\Request;
class BookingController extends Controller {
    public function store(Request $r) {
        $data = $r->validate(['hostel_id' => 'required|exists:hostels,id', 'check_in' => 'required|date', 'check_out' => 'required|date|after:check_in', 'guests' => 'integer|min:1']);
        $hostel = Hostel::findOrFail($data['hostel_id']);
        $nights = max(1, \Carbon\Carbon::parse($data['check_in'])->diffInDays(\Carbon\Carbon::parse($data['check_out'])));
        $total = $hostel->price_per_day_mad * $nights;
        return Booking::create([...$data, 'user_id' => $r->user()->id, 'total_mad' => $total, 'commission_mad' => (int) round($total * 0.12), 'status' => 'pending']);
    }
    public function mine(Request $r) { return Booking::with('hostel')->where('user_id', $r->user()->id)->latest()->get(); }
}
