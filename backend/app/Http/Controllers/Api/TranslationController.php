<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\TranslationResource;
use App\Models\Translation;
use App\Support\Languages;
use Illuminate\Http\Request;
class TranslationController extends Controller {
    public function languages() { return array_values(Languages::AVAILABLE); }
    public function index(Request $r) {
        $locale = $r->query('locale', Languages::DEFAULT);
        if (!Languages::isSupported($locale)) return response()->json(['message' => 'Unsupported locale. Use ar, fr or en.'], 422);
        $rows = Translation::where('locale', $locale)->get();
        $translations = [];
        foreach ($rows as $row) $translations[$row->key] = $row->value;
        return ['locale' => $locale, 'direction' => Languages::AVAILABLE[$locale]['direction'], 'translations' => $translations];
    }
}
