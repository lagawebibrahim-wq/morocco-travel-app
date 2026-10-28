<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
class PlaceResource extends JsonResource {
    public function toArray($request): array {
        return ['id' => $this->id, 'city_id' => $this->city_id, 'city' => $this->whenLoaded('city', fn() => new CityResource($this->city)), 'name' => $this->name, 'location' => $this->location, 'distance_km' => (float) $this->distance_km, 'rating' => (float) $this->rating, 'travelers_count' => $this->travelers_count, 'image_url' => $this->image_url, 'description' => $this->description, 'hostels' => HostelResource::collection($this->whenLoaded('hostels'))];
    }
}
