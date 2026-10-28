<?php
namespace App\Services;
use App\Models\Place;
class ReviewService {
    public static function refreshPlaceRating(Place $place): void {
        $avg = $place->reviews()->avg('rating');
        if ($avg !== null) $place->update(['rating' => round($avg, 1)]);
    }
}
