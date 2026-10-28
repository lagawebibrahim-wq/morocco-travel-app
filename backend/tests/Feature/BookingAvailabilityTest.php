<?php
namespace Tests\Feature;
use App\Models\Booking;
use App\Models\Hostel;
use App\Models\Place;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class BookingAvailabilityTest extends TestCase {
    use RefreshDatabase;
    public function test_overlapping_booking_rejected_and_cancelled_frees_dates(): void {
        $user = User::factory()->create(); $hostel = Hostel::factory()->create();
        Booking::factory()->for($user, 'user')->for($hostel, 'hostel')->create(['check_in' => now()->addDay()->toDateString(), 'check_out' => now()->addDays(3)->toDateString(), 'status' => 'pending']);
        // Overlap: same dates
        $this->actingAs($user, 'sanctum')->postJson('/api/bookings', ['hostel_id' => $hostel->id, 'check_in' => now()->addDay()->toDateString(), 'check_out' => now()->addDays(3)->toDateString()])->assertUnprocessable();
        // Non-overlapping: after the first booking ends
        $this->actingAs($user, 'sanctum')->postJson('/api/bookings', ['hostel_id' => $hostel->id, 'check_in' => now()->addDays(3)->toDateString(), 'check_out' => now()->addDays(5)->toDateString()])->assertCreated();
    }
    public function test_profile_update(): void {
        $user = User::factory()->create(['name' => 'Ali']);
        $this->actingAs($user, 'sanctum')->putJson('/api/me', ['name' => 'Ali Updated'])->assertOk()->assertJsonPath('name', 'Ali Updated');
    }
    public function test_places_pagination_and_sort(): void {
        Place::factory()->create(['name' => 'Low Rated', 'rating' => 3.0]);
        Place::factory()->create(['name' => 'High Rated', 'rating' => 5.0]);
        $res = $this->getJson('/api/places?sort=rating&per_page=1')->assertOk();
        $this->assertEquals('High Rated', $res->json('data.0.name'));
        $this->assertArrayHasKey('meta', $res->json());
    }
}
