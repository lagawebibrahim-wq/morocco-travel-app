<?php
namespace Database\Factories;
use App\Models\Hostel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
class BookingFactory extends Factory {
    public function definition(): array {
        return ['user_id' => User::factory(), 'hostel_id' => Hostel::factory(), 'check_in' => now()->addDay()->toDateString(), 'check_out' => now()->addDays(3)->toDateString(), 'guests' => 2, 'total_mad' => 725, 'commission_mad' => 83, 'status' => 'pending', 'payment_method' => 'cash'];
    }
}
