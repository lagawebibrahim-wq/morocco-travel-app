<?php
namespace Tests\Feature;
use App\Models\Place;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class ReviewsApiTest extends TestCase {
    use RefreshDatabase;
    public function test_create_review_updates_place_rating(): void {
        $user = User::factory()->create(); $place = Place::factory()->create(['rating' => 4.9]);
        $res = $this->actingAs($user, 'sanctum')->postJson("/api/places/{$place->id}/reviews", ['rating' => 5, 'comment' => 'Amazing']);
        $res->assertCreated()->assertJsonPath('data.rating', 5);
        $this->assertEquals(5.0, (float) $place->fresh()->rating);
        $this->getJson("/api/places/{$place->id}/reviews")->assertOk()->assertJsonCount(1, 'data');
    }
    public function test_review_rating_validation(): void {
        $user = User::factory()->create(); $place = Place::factory()->create();
        $this->actingAs($user, 'sanctum')->postJson("/api/places/{$place->id}/reviews", ['rating' => 9])->assertUnprocessable();
    }
}
