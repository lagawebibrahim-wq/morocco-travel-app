<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\City;
use App\Models\Place;
use App\Models\Hostel;
class TravelSeeder extends Seeder {
    public function run(): void {
        $city = City::firstOrCreate(['slug' => 'marrakech'], ['name' => 'Marrakech']);
        $places = [
            ['name' => 'Merzouga Marrakesh', 'location' => 'Marrakech, Morocco', 'distance_km' => 9.7, 'rating' => 4.9],
            ['name' => 'Imlil Marrakesh', 'location' => 'Marrakech, Morocco', 'distance_km' => 4.5, 'rating' => 4.8],
            ['name' => 'Marrakesh', 'location' => 'Marrakech, Morocco', 'distance_km' => 10.3, 'rating' => 4.9],
            ['name' => 'Agafay', 'location' => 'Marrakech, Morocco', 'distance_km' => 23.0, 'rating' => 4.7],
        ];
        foreach ($places as $data) {
            $place = Place::firstOrCreate(['name' => $data['name']], [...$data, 'city_id' => $city->id, 'travelers_count' => 15]);
            if ($data['name'] === 'Merzouga Marrakesh') {
                Hostel::firstOrCreate(['name' => 'Hostel Ils'], ['place_id' => $place->id, 'price_per_day_mad' => 345, 'rating' => 4.9]);
            }
        }
    }
}
