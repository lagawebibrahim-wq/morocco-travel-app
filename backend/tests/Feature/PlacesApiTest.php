<?php
namespace Tests\Feature;
use App\Models\City;
use App\Models\Place;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class PlacesApiTest extends TestCase {
    use RefreshDatabase;
    public function test_lists_places(): void {
        $city = City::factory()->create();
        Place::factory()->for($city, 'city')->create(['name' => 'Merzouga Marrakesh']);
        $this->getJson('/api/places')->assertOk()->assertJsonFragment(['name' => 'Merzouga Marrakesh']);
    }
    public function test_search_places(): void {
        $city = City::factory()->create();
        Place::factory()->for($city, 'city')->create(['name' => 'Imlil Marrakesh']);
        $this->getJson('/api/places?search=Imlil')->assertOk()->assertJsonFragment(['name' => 'Imlil Marrakesh']);
    }
}
