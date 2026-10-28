<?php
namespace Tests\Feature;
use App\Models\Translation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class TranslationsApiTest extends TestCase {
    use RefreshDatabase;
    public function test_languages_list(): void {
        $res = $this->getJson('/api/languages')->assertOk();
        $this->assertContains('ar', collect($res->json())->pluck('code')->all());
        $this->assertContains('fr', collect($res->json())->pluck('code')->all());
        $this->assertContains('en', collect($res->json())->pluck('code')->all());
    }
    public function test_translations_come_from_backend(): void {
        Translation::create(['locale' => 'ar', 'key' => 'book_now', 'value' => 'احجز الآن']);
        Translation::create(['locale' => 'fr', 'key' => 'book_now', 'value' => 'Réserver']);
        $this->getJson('/api/translations?locale=ar')->assertOk()->assertJsonPath('locale', 'ar')->assertJsonPath('translations.book_now', 'احجز الآن');
        $this->getJson('/api/translations?locale=fr')->assertOk()->assertJsonPath('translations.book_now', 'Réserver');
    }
    public function test_unsupported_locale_rejected(): void {
        $this->getJson('/api/translations?locale=es')->assertUnprocessable();
    }
}
