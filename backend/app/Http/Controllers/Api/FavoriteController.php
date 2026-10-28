<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\PlaceResource;
use App\Models\Favorite;
use Illuminate\Http\Request;
class FavoriteController extends Controller {
    public function index(Request $r) { return PlaceResource::collection(Favorite::with('place')->where('user_id', $r->user()->id)->get()->map->place->filter()); }
    public function store(Request $r) {
        $data = $r->validate(['place_id' => 'required|exists:places,id']);
        $fav = Favorite::firstOrCreate(['user_id' => $r->user()->id, 'place_id' => $data['place_id']]);
        return response()->json(['saved' => true, 'favorite_id' => $fav->id]);
    }
    public function toggle(Request $r) {
        $data = $r->validate(['place_id' => 'required|exists:places,id']);
        $fav = Favorite::where('user_id', $r->user()->id)->where('place_id', $data['place_id'])->first();
        if ($fav) { $fav->delete(); return ['saved' => false]; }
        Favorite::create(['user_id' => $r->user()->id, 'place_id' => $data['place_id']]);
        return ['saved' => true];
    }
    public function destroy(Request $r, Favorite $favorite) {
        if ($favorite->user_id !== $r->user()->id) return response()->json(['message' => 'Forbidden'], 403);
        $favorite->delete(); return response()->noContent();
    }
}
