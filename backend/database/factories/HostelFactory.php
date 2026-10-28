<?php
namespace Database\Factories;
use App\Models\Place;
use Illuminate\Database\Eloquent\Factories\Factory;
class HostelFactory extends Factory {
    public function definition(): array { return ['place_id' => Place::factory(), 'name' => 'Hostel Ils', 'price_per_day_mad' => 345, 'rating' => 4.9, 'image_url' => null, 'is_featured' => false]; }
}
