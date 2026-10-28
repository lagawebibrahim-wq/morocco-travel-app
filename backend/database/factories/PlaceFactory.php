<?php
namespace Database\Factories;
use App\Models\City;
use Illuminate\Database\Eloquent\Factories\Factory;
class PlaceFactory extends Factory {
    public function definition(): array { return ['city_id' => City::factory(), 'name' => 'Merzouga Marrakesh', 'location' => 'Marrakech, Morocco', 'distance_km' => 9.7, 'rating' => 4.9, 'travelers_count' => 15, 'image_url' => null, 'description' => null, 'latitude' => 31.0997, 'longitude' => -4.0117]; }
}
