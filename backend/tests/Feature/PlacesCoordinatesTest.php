<?php
namespace Tests\Feature;
use App\Models\Place;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class PlacesCoordinatesTest extends TestCase {
    use RefreshDatabase;
    public function test_place_exposes_latitude_longitude_and_image(): void {
        $place = Place::factory()->create(['latitude' => 31.0997, 'longitude' => -4.0117, 'image_url' => 'https://picsum.photos/seed/merzouga/800/600']);
        $this->getJson("/api/places/{$place->id}")->assertOk()
            ->assertJsonPath('data.latitude', 31.0997)
            ->assertJsonPath('data.longitude', -4.0117)
            ->assertJsonPath('data.image_url', 'https://picsum.photos/seed/merzouga/800/600');
    }
}
