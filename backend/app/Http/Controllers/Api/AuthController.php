<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller {
    public function register(RegisterRequest $r) {
        $data = $r->validated();
        $user = User::create([...$data, 'password' => Hash::make($data['password'])]);
        return ['user' => $user, 'token' => $user->createToken('mobile')->plainTextToken];
    }
    public function login(LoginRequest $r) {
        $data = $r->validated();
        $user = User::where('email', $data['email'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) return response()->json(['message' => 'Invalid credentials'], 401);
        return ['user' => $user, 'token' => $user->createToken('mobile')->plainTextToken];
    }
    public function me(Request $r) { return $r->user(); }
    public function logout(Request $r) { $r->user()->currentAccessToken()->delete(); return response()->noContent(); }
}
