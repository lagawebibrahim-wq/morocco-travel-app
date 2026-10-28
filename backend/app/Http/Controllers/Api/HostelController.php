<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\HostelResource;
use App\Models\Hostel;
use Illuminate\Http\Request;
class HostelController extends Controller {
    public function index(Request $r) { return HostelResource::collection(Hostel::when($r->place_id, fn($q) => $q->where('place_id', $r->place_id))->orderByDesc('is_featured')->get()); }
    public function show(Hostel $hostel) { return new HostelResource($hostel); }
}
