<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller {
    public function register(Request $r) {
        $data = $r->validate(['name' => 'required|string', 'email' => 'required|email|unique:users', 'password' => 'required|min:8']);
        $user = User::create([...$data, 'password' => Hash::make($data['password'])]);
        return ['user' => $user, 'token' => $user->createToken('mobile')->plainTextToken];
    }
    public function login(Request $r) {
        $data = $r->validate(['email' => 'required|email', 'password' => 'required']);
        $user = User::where('email', $data['email'])->first();
        if (!$user || !Hash::check($data['password'], $user->password)) return response()->json(['message' => 'Invalid credentials'], 401);
        return ['user' => $user, 'token' => $user->createToken('mobile')->plainTextToken];
    }
    public function me(Request $r) { return $r->user(); }
    public function logout(Request $r) { $r->user()->currentAccessToken()->delete(); return response()->noContent(); }
}
