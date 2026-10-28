<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\PlaceResource;
use App\Models\Place;
use Illuminate\Http\Request;
class PlaceController extends Controller {
    public function index(Request $r) {
        $places = Place::with('city')->when($r->city_id, fn($q) => $q->where('city_id', $r->city_id))
            ->when($r->search, fn($q) => $q->where('name', 'like', "%{$r->search}%"))
            ->when($r->category, fn($q) => $q->where('name', 'like', "%{$r->category}%"))
            ->when($r->sort === 'rating', fn($q) => $q->orderByDesc('rating'))
            ->when($r->sort === 'distance', fn($q) => $q->orderBy('distance_km'))
            ->paginate(min(50, (int) $r->query('per_page', 20)));
        return PlaceResource::collection($places);
    }
    public function show(Place $place) { return new PlaceResource($place->load(['city', 'hostels', 'reviews.user'])); }
}
