<?php
namespace Tests\Feature;
use App\Models\Booking;
use App\Models\Hostel;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class BookingPaymentTest extends TestCase {
    use RefreshDatabase;
    public function test_booking_with_card_payment_and_cancel(): void {
        $user = User::factory()->create(); $hostel = Hostel::factory()->create(['price_per_day_mad' => 345]);
        $res = $this->actingAs($user, 'sanctum')->postJson('/api/bookings', ['hostel_id' => $hostel->id, 'check_in' => now()->addDay()->toDateString(), 'check_out' => now()->addDays(3)->toDateString(), 'guests' => 2, 'payment_method' => 'card']);
        $res->assertCreated()->assertJsonPath('data.payment_method', 'card')->assertJsonPath('data.total_mad', 725);
        $id = $res->json('data.id');
        $this->actingAs($user, 'sanctum')->postJson("/api/bookings/{$id}/cancel")->assertOk()->assertJsonPath('data.status', 'cancelled');
    }
    public function test_cancel_other_users_booking_forbidden(): void {
        $owner = User::factory()->create(); $other = User::factory()->create();
        $booking = Booking::factory()->for($owner, 'user')->create();
        $this->actingAs($other, 'sanctum')->postJson("/api/bookings/{$booking->id}/cancel")->assertForbidden();
    }
    public function test_invalid_payment_method_rejected(): void {
        $user = User::factory()->create(); $hostel = Hostel::factory()->create();
        $this->actingAs($user, 'sanctum')->postJson('/api/bookings', ['hostel_id' => $hostel->id, 'check_in' => now()->addDay()->toDateString(), 'check_out' => now()->addDays(3)->toDateString(), 'payment_method' => 'crypto'])->assertUnprocessable();
    }
}
