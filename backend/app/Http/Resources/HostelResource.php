<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
class HostelResource extends JsonResource {
    public function toArray($request): array { return ['id' => $this->id, 'place_id' => $this->place_id, 'name' => $this->name, 'price_per_day_mad' => $this->price_per_day_mad, 'rating' => (float) $this->rating, 'image_url' => $this->image_url, 'is_featured' => (bool) $this->is_featured]; }
}
