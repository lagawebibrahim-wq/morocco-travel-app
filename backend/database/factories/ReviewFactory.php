<?php
namespace Database\Factories;
use App\Models\Place;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
class ReviewFactory extends Factory {
    public function definition(): array { return ['user_id' => User::factory(), 'place_id' => Place::factory(), 'rating' => 5, 'comment' => 'Beautiful place, highly recommended.']; }
}
