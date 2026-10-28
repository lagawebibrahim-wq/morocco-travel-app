<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\PlaceController;
use App\Http\Controllers\Api\HostelController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\FavoriteController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/cities', [CityController::class, 'index']);
Route::get('/places', [PlaceController::class, 'index']);
Route::get('/places/{place}', [PlaceController::class, 'show']);
Route::get('/hostels', [HostelController::class, 'index']);
Route::get('/hostels/{hostel}', [HostelController::class, 'show']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/me', [BookingController::class, 'mine']);
    Route::get('/favorites/me', [FavoriteController::class, 'index']);
    Route::post('/favorites', [FavoriteController::class, 'store']);
    Route::post('/favorites/toggle', [FavoriteController::class, 'toggle']);
    Route::delete('/favorites/{favorite}', [FavoriteController::class, 'destroy']);
});
