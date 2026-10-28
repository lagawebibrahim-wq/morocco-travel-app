<?php
namespace App\Support;
class Languages {
    public const AVAILABLE = [
        'ar' => ['code' => 'ar', 'name' => 'العربية', 'direction' => 'rtl'],
        'fr' => ['code' => 'fr', 'name' => 'Français', 'direction' => 'ltr'],
        'en' => ['code' => 'en', 'name' => 'English', 'direction' => 'ltr'],
    ];
    public const DEFAULT = 'en';
    public static function isSupported(string $locale): bool { return isset(self::AVAILABLE[$locale]); }
}
