<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Place extends Model {
    protected $fillable = ['city_id', 'name', 'location', 'distance_km', 'rating', 'travelers_count', 'image_url', 'description', 'latitude', 'longitude'];
    public function city(): BelongsTo { return $this->belongsTo(City::class); }
    public function hostels(): HasMany { return $this->hasMany(Hostel::class); }
    public function reviews(): HasMany { return $this->hasMany(Review::class); }
}
