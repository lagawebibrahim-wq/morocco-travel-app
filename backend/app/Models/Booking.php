<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Booking extends Model {
    protected $fillable = ['user_id', 'hostel_id', 'check_in', 'check_out', 'guests', 'total_mad', 'commission_mad', 'status', 'payment_method'];
    protected $casts = ['check_in' => 'date', 'check_out' => 'date'];
    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function hostel(): BelongsTo { return $this->belongsTo(Hostel::class); }
}
