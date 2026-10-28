<?php
namespace Tests\Feature;
use App\Models\Place;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class FavoritesApiTest extends TestCase {
    use RefreshDatabase;
    public function test_toggle_save_and_unsave(): void {
        $user = User::factory()->create(); $place = Place::factory()->create();
        $this->actingAs($user, 'sanctum')->postJson('/api/favorites/toggle', ['place_id' => $place->id])->assertOk()->assertJsonPath('saved', true);
        $this->actingAs($user, 'sanctum')->getJson('/api/favorites/me')->assertOk()->assertJsonCount(1, 'data');
        $this->actingAs($user, 'sanctum')->postJson('/api/favorites/toggle', ['place_id' => $place->id])->assertOk()->assertJsonPath('saved', false);
        $this->actingAs($user, 'sanctum')->getJson('/api/favorites/me')->assertOk()->assertJsonCount(0, 'data');
    }
    public function test_favorites_require_auth(): void {
        $this->getJson('/api/favorites/me')->assertUnauthorized();
    }
}
