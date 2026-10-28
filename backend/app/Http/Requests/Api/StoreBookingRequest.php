<?php
namespace App\Http\Requests\Api;
use Illuminate\Foundation\Http\FormRequest;
class StoreBookingRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'hostel_id' => 'required|exists:hostels,id',
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'guests' => 'integer|min:1|max:10',
        ];
    }
}
