<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::table('places', function (Blueprint $t) { $t->decimal('latitude', 10, 7)->nullable(); $t->decimal('longitude', 10, 7)->nullable(); });
    }
    public function down(): void {
        Schema::table('places', function (Blueprint $t) { $t->dropColumn(['latitude', 'longitude']); });
    }
};
