<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Place;
use Illuminate\Http\Request;
class PlaceController extends Controller {
    public function index(Request $r) {
        return Place::with('city')->when($r->city_id, fn($q) => $q->where('city_id', $r->city_id))
            ->when($r->search, fn($q) => $q->where('name', 'like', "%{$r->search}%"))->get();
    }
    public function show(Place $place) { return $place->load(['city', 'hostels']); }
}
