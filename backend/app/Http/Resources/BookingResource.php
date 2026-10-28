<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
class BookingResource extends JsonResource {
    public function toArray($request): array { return ['id' => $this->id, 'user_id' => $this->user_id, 'hostel_id' => $this->hostel_id, 'hostel' => $this->whenLoaded('hostel', fn() => new HostelResource($this->hostel)), 'check_in' => $this->check_in?->toDateString(), 'check_out' => $this->check_out?->toDateString(), 'guests' => $this->guests, 'total_mad' => $this->total_mad, 'commission_mad' => $this->commission_mad, 'status' => $this->status, 'payment_method' => $this->payment_method]; }
}
