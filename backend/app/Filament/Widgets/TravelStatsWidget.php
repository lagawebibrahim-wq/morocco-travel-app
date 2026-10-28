<?php
namespace App\Filament\Widgets;
use App\Models\Booking;
use App\Models\Hostel;
use App\Models\Place;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
class TravelStatsWidget extends BaseWidget {
    protected function getStats(): array {
        return [
            Stat::make('Bookings', Booking::count()),
            Stat::make('Revenue (MAD)', Booking::where('status', '!=', 'cancelled')->sum('total_mad')),
            Stat::make('Commission (MAD)', Booking::where('status', '!=', 'cancelled')->sum('commission_mad')),
            Stat::make('Hostels', Hostel::count()),
            Stat::make('Places', Place::count()),
        ];
    }
}
