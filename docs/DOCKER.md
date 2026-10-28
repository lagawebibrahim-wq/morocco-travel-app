# Docker — كلشي في Docker (PostgreSQL)

## شنو كاين في docker-compose.yml؟
- `db` — PostgreSQL 16 (alpine)، بورت 5432، البيانات محفوظة في volume `pgdata`
- `api` — Laravel + Filament، بورت 8000، كيتسنى Postgres، كيدير `migrate`، ثم `serve`
- `mobile-web` — نسخة ويب للمعاينة فقط (profile `web`)، بورت 8081

## تشغيل
```bash
cd travel-app
docker compose up --build
# API:     http://localhost:8000/api
# Admin:   http://localhost:8000/admin
# Postgres: localhost:5432 — db: morocco_travel, user: morocco
# Mobile web (اختياري):
docker compose --profile web up --build mobile-web
# http://localhost:8081
```

## أوامر مفيدة
```bash
docker compose ps
docker compose logs -f api
docker compose exec api php artisan migrate --seed
docker compose exec api php artisan make:filament-user
docker compose down        # يوقف بلا ما يمسح البيانات
docker compose down -v     # يوقف ويمسح بيانات Postgres — انتبه
```

## ملاحظة مهمة — v2
في v2، أول `docker compose up --build` كيسكافولدي Laravel بوحدو داخل
الكونتينر (Composer create-project + overlay ديال المشروع + Sanctum/Filament)،
ومن بعد كيدير migrate --seed و serve. أول تشغيل كياخد دقائق (تحميل Laravel)،
ومن بعد كيخدم عادي. ما بقاش خاصك تسكافولدي يدويا قبل Docker.
للتطوير بلا Docker، استعمل `scripts/setup-laravel.sh` (شوف backend/README.md).

هاد الجهاز اللي خدام فيه دابا ما فيهش Docker ولا PHP، داكشي علاش ما جربتش
`docker compose up` هنا — الملفات متأكدة من ناحية YAML والمتغيرات، ولكن
أول تشغيل حقيقي خاصو يكون عندك في جهازك.

## UI/UX — ما تبدل والو
Docker و PostgreSQL بدلو غير الـ backend والتشغيل. ملفات الموبايل
`mobile/src/theme.ts` والشاشات ما تقاسوش: نفس الألوان (#f9f9f9، #d0a774،
برتقالي Book Now)، نفس الشاشات، نفس المحتوى (Marzouga، Imlil، Hostel Ils 345 MAD).
