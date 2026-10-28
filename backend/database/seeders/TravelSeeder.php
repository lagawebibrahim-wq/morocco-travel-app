<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\City;
use App\Models\Place;
use App\Models\Hostel;
use App\Models\User;
use App\Models\Booking;
use App\Models\Favorite;
class TravelSeeder extends Seeder {
    public function run(): void {
        $marrakech = City::firstOrCreate(['slug' => 'marrakech'], ['name' => 'Marrakech']);
        $merzouga = City::firstOrCreate(['slug' => 'merzouga'], ['name' => 'Merzouga']);
        // Figma places (Marrakech region) + extra places so lists are not empty in tests/demo
        $places = [
            ['city' => $marrakech, 'name' => 'Merzouga Marrakesh', 'location' => 'Marrakech, Morocco', 'distance_km' => 9.7, 'rating' => 4.9, 'travelers_count' => 15, 'description' => 'Desert dunes and camel rides near Merzouga.'],
            ['city' => $marrakech, 'name' => 'Imlil Marrakesh', 'location' => 'Marrakech, Morocco', 'distance_km' => 4.5, 'rating' => 4.8, 'travelers_count' => 15, 'description' => 'Atlas mountain village, start of Toubkal hikes.'],
            ['city' => $marrakech, 'name' => 'Marrakesh', 'location' => 'Marrakech, Morocco', 'distance_km' => 10.3, 'rating' => 4.9, 'travelers_count' => 15, 'description' => 'Medina, Jemaa el-Fnaa and souks.'],
            ['city' => $marrakech, 'name' => 'Agafay', 'location' => 'Marrakech, Morocco', 'distance_km' => 23.0, 'rating' => 4.7, 'travelers_count' => 15, 'description' => 'Rocky desert with luxury camps, 40 min from Marrakech.'],
            ['city' => $marrakech, 'name' => 'Ourika Valley', 'location' => 'Marrakech, Morocco', 'distance_km' => 30.0, 'rating' => 4.6, 'travelers_count' => 12, 'description' => 'Waterfalls and Berber villages.'],
            ['city' => $merzouga, 'name' => 'Erg Chebbi Dunes', 'location' => 'Merzouga, Morocco', 'distance_km' => 2.0, 'rating' => 4.9, 'travelers_count' => 20, 'description' => 'The highest dunes in Morocco.'],
        ];
        $placeModels = [];
        foreach ($places as $data) {
            $city = $data['city']; unset($data['city']);
            $placeModels[$data['name']] = Place::firstOrCreate(['name' => $data['name']], [...$data, 'city_id' => $city->id]);
        }
        $hostels = [
            ['place' => 'Merzouga Marrakesh', 'name' => 'Hostel Ils', 'price_per_day_mad' => 345, 'rating' => 4.9, 'is_featured' => true],
            ['place' => 'Merzouga Marrakesh', 'name' => 'Desert Camp Hostel', 'price_per_day_mad' => 420, 'rating' => 4.8, 'is_featured' => false],
            ['place' => 'Imlil Marrakesh', 'name' => 'Atlas Mountain Hostel', 'price_per_day_mad' => 280, 'rating' => 4.7, 'is_featured' => false],
            ['place' => 'Marrakesh', 'name' => 'Medina Riad Hostel', 'price_per_day_mad' => 390, 'rating' => 4.8, 'is_featured' => true],
            ['place' => 'Agafay', 'name' => 'Agafay Camp', 'price_per_day_mad' => 550, 'rating' => 4.7, 'is_featured' => false],
            ['place' => 'Erg Chebbi Dunes', 'name' => 'Dune Night Camp', 'price_per_day_mad' => 480, 'rating' => 4.9, 'is_featured' => true],
        ];
        // Coordinates + demo images (picsum seeds for test/demo; replace image_url with real photos before production)
        $coords = {'Merzouga Marrakesh': (31.0997, -4.0117, 'merzouga'), 'Imlil Marrakesh': (31.1325, -7.9167, 'imlil'), 'Marrakesh': (31.6295, -7.9811, 'marrakech'), 'Agafay': (31.4426, -8.0203, 'agafay'), 'Ourika Valley': (31.35, -7.75, 'ourika'), 'Erg Chebbi Dunes': (31.1475, -3.975, 'ergchebbi')};
        foreach ($placeModels as $name => $place) {
            if (isset($coords[$name])) {
                $place->update(['latitude' => $coords[$name][0], 'longitude' => $coords[$name][1], 'image_url' => 'https://picsum.photos/seed/' . $coords[$name][2] . '/800/600']);
            }
        }
        $hostelModels = [];
        foreach ($hostels as $h) {
            $placeName = $h['place']; unset($h['place']);
            $hostelModels[$h['name']] = Hostel::firstOrCreate(['name' => $h['name']], [...$h, 'place_id' => $placeModels[$placeName]->id]);
        }
        // Demo users — change passwords before production
        $admin = User::firstOrCreate(['email' => 'admin@travel.local'], ['name' => 'Admin', 'password' => Hash::make('password123')]);
        $ali = User::firstOrCreate(['email' => 'ali@travel.local'], ['name' => 'Ali', 'password' => Hash::make('password123')]);
        // Demo booking for Ali: Hostel Ils, 2 nights x 345 + 35 = 725 MAD, commission 83 MAD
        Booking::firstOrCreate(
            ['user_id' => $ali->id, 'hostel_id' => $hostelModels['Hostel Ils']->id, 'check_in' => now()->addDays(7)->toDateString()],
            ['check_out' => now()->addDays(9)->toDateString(), 'guests' => 2, 'total_mad' => 725, 'commission_mad' => 83, 'status' => 'confirmed', 'payment_method' => 'cash']
        );
        Favorite::firstOrCreate(['user_id' => $ali->id, 'place_id' => $placeModels['Merzouga Marrakesh']->id]);
    }
}
