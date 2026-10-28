<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Hostel extends Model {
    protected $fillable = ['place_id', 'name', 'price_per_day_mad', 'rating', 'image_url', 'is_featured'];
    protected $casts = ['is_featured' => 'boolean'];
    public function place(): BelongsTo { return $this->belongsTo(Place::class); }
}
