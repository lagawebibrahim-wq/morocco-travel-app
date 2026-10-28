<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class CityFactory extends Factory {
    public function definition(): array { return ['name' => 'Marrakech', 'slug' => 'marrakech-' . $this->faker->unique()->word, 'image_url' => null]; }
}
