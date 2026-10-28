<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Place;
use App\Models\Review;
use App\Services\ReviewService;
use Illuminate\Http\Request;
class ReviewController extends Controller {
    public function index(Place $place) { return ReviewResource::collection($place->reviews()->with('user')->latest()->paginate(20)); }
    public function store(Request $r, Place $place) {
        $data = $r->validate(['rating' => 'required|integer|min:1|max:5', 'comment' => 'nullable|string|max:1000']);
        $review = Review::updateOrCreate(
            ['user_id' => $r->user()->id, 'place_id' => $place->id],
            [...$data, 'user_id' => $r->user()->id, 'place_id' => $place->id]
        );
        ReviewService::refreshPlaceRating($place->fresh());
        return (new ReviewResource($review->load('user')))->response()->setStatusCode(201);
    }
}
