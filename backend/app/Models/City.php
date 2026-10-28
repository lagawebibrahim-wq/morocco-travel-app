<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class City extends Model {
    protected $fillable = ['name', 'slug', 'image_url'];
    public function places(): HasMany { return $this->hasMany(Place::class); }
}
