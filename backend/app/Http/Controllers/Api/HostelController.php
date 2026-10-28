<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Hostel;
use Illuminate\Http\Request;
class HostelController extends Controller {
    public function index(Request $r) { return Hostel::when($r->place_id, fn($q) => $q->where('place_id', $r->place_id))->get(); }
    public function show(Hostel $hostel) { return $hostel; }
}
