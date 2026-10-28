<?php
namespace Tests\Unit;
use App\Services\BookingPricing;
use PHPUnit\Framework\TestCase;
class BookingPricingTest extends TestCase {
    public function test_figma_example_725(): void {
        $p = BookingPricing::calculate(345, '2026-11-01', '2026-11-03');
        $this->assertSame(2, $p['nights']);
        $this->assertSame(690, $p['subtotal_mad']);
        $this->assertSame(35, $p['service_fee_mad']);
        $this->assertSame(725, $p['total_mad']);
        $this->assertSame(83, $p['commission_mad']); // 12% of 690 = 82.8 -> 83
    }
    public function test_one_night_and_long_stay(): void {
        $this->assertSame(380, BookingPricing::calculate(345, '2026-11-01', '2026-11-02')['total_mad']);
        $this->assertSame(7, BookingPricing::calculate(100, '2026-11-01', '2026-11-08')['nights']);
    }
    public function test_same_day_counts_as_one_night(): void {
        $this->assertSame(1, BookingPricing::nights('2026-11-01', '2026-11-01'));
    }
}
