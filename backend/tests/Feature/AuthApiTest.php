<?php
namespace Tests\Feature;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class AuthApiTest extends TestCase {
    use RefreshDatabase;
    public function test_register_login_me_logout(): void {
        $reg = $this->postJson('/api/register', ['name' => 'Ali', 'email' => 'ali@test.local', 'password' => 'password123']);
        $reg->assertCreated()->assertJsonPath('user.email', 'ali@test.local');
        $token = $reg->json('token'); $this->assertNotEmpty($token);
        $this->withToken($token)->getJson('/api/me')->assertOk()->assertJsonPath('email', 'ali@test.local');
        $this->withToken($token)->postJson('/api/logout')->assertNoContent();
    }
    public function test_login_fails_with_wrong_password(): void {
        User::factory()->create(['email' => 'ali@test.local', 'password' => bcrypt('password123')]);
        $this->postJson('/api/login', ['email' => 'ali@test.local', 'password' => 'wrongpass'])->assertUnauthorized();
    }
    public function test_register_validates(): void {
        $this->postJson('/api/register', ['name' => '', 'email' => 'not-an-email', 'password' => 'short'])->assertUnprocessable();
    }
}
