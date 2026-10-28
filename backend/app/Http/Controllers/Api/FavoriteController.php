<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;
class FavoriteController extends Controller {
    public function index(Request $r) { return Favorite::with('place')->where('user_id', $r->user()->id)->get(); }
    public function store(Request $r) {
        $data = $r->validate(['place_id' => 'required|exists:places,id']);
        return Favorite::firstOrCreate(['user_id' => $r->user()->id, 'place_id' => $data['place_id']]);
    }
    public function destroy(Request $r, Favorite $favorite) {
        if ($favorite->user_id !== $r->user()->id) return response()->json(['message' => 'Forbidden'], 403);
        $favorite->delete(); return response()->noContent();
    }
}
