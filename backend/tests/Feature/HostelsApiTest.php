<?php
namespace Tests\Feature;
use App\Models\Hostel;
use App\Models\Place;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class HostelsApiTest extends TestCase {
    use RefreshDatabase;
    public function test_lists_hostels_and_filters_by_place(): void {
        $place = Place::factory()->create();
        $other = Place::factory()->create(['name' => 'Other Place']);
        Hostel::factory()->for($place, 'place')->create(['name' => 'Hostel Ils', 'price_per_day_mad' => 345]);
        Hostel::factory()->for($other, 'place')->create(['name' => 'Other Hostel']);
        $this->getJson('/api/hostels')->assertOk()->assertJsonCount(2, 'data');
        $this->getJson("/api/hostels?place_id={$place->id}")->assertOk()->assertJsonCount(1, 'data')->assertJsonFragment(['name' => 'Hostel Ils']);
    }
}
