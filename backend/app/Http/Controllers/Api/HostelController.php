<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\HostelResource;
use App\Models\Hostel;
use Illuminate\Http\Request;
class HostelController extends Controller {
    public function index(Request $r) {
        $hostels = Hostel::when($r->place_id, fn($q) => $q->where('place_id', $r->place_id))
            ->when($r->min_price, fn($q) => $q->where('price_per_day_mad', '>=', (int) $r->min_price))
            ->when($r->max_price, fn($q) => $q->where('price_per_day_mad', '<=', (int) $r->max_price))
            ->when($r->sort === 'price', fn($q) => $q->orderBy('price_per_day_mad'))
            ->when($r->sort === 'rating', fn($q) => $q->orderByDesc('rating'))
            ->orderByDesc('is_featured')
            ->paginate(min(50, (int) $r->query('per_page', 20)));
        return HostelResource::collection($hostels);
    }
    public function show(Hostel $hostel) { return new HostelResource($hostel); }
}
