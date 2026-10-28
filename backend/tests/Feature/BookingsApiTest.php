<?php
namespace Tests\Feature;
use App\Models\Hostel;
use App\Models\Place;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class BookingsApiTest extends TestCase {
    use RefreshDatabase;
    public function test_booking_total_includes_service_fee(): void {
        $user = User::factory()->create();
        $hostel = Hostel::factory()->create(['price_per_day_mad' => 345]);
        $res = $this->actingAs($user, 'sanctum')->postJson('/api/bookings', ['hostel_id' => $hostel->id, 'check_in' => now()->addDay()->toDateString(), 'check_out' => now()->addDays(3)->toDateString(), 'guests' => 2]);
        $res->assertCreated();
        // 2 nights x 345 + 35 fee = 725, commission 12% of 690 = 83 (rounded)
        $this->assertEquals(725, $res->json('data.total_mad') ?? $res->json('total_mad'));
        $this->assertEquals(83, $res->json('data.commission_mad') ?? $res->json('commission_mad'));
    }
    public function test_booking_validation_rejects_bad_dates(): void {
        $user = User::factory()->create(); $hostel = Hostel::factory()->create();
        $this->actingAs($user, 'sanctum')->postJson('/api/bookings', ['hostel_id' => $hostel->id, 'check_in' => now()->addDays(3)->toDateString(), 'check_out' => now()->addDay()->toDateString(), 'guests' => 2])->assertUnprocessable();
        $this->actingAs($user, 'sanctum')->postJson('/api/bookings', ['hostel_id' => $hostel->id, 'check_in' => now()->addDay()->toDateString(), 'check_out' => now()->addDays(3)->toDateString(), 'guests' => 99])->assertUnprocessable();
    }
    public function test_booking_requires_auth(): void {
        $this->postJson('/api/bookings', [])->assertUnauthorized();
    }
}
