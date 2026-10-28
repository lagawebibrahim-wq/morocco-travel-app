<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('cities', function (Blueprint $t) { $t->id(); $t->string('name'); $t->string('slug')->unique(); $t->string('image_url')->nullable(); $t->timestamps(); });
        Schema::create('places', function (Blueprint $t) { $t->id(); $t->foreignId('city_id')->constrained()->cascadeOnDelete(); $t->string('name'); $t->string('location'); $t->decimal('distance_km', 5, 1); $t->decimal('rating', 3, 1)->default(4.5); $t->integer('travelers_count')->default(15); $t->string('image_url')->nullable(); $t->text('description')->nullable(); $t->timestamps(); });
        Schema::create('hostels', function (Blueprint $t) { $t->id(); $t->foreignId('place_id')->constrained()->cascadeOnDelete(); $t->string('name'); $t->integer('price_per_day_mad'); $t->decimal('rating', 3, 1)->default(4.5); $t->string('image_url')->nullable(); $t->boolean('is_featured')->default(false); $t->timestamps(); });
        Schema::create('bookings', function (Blueprint $t) { $t->id(); $t->foreignId('user_id')->constrained()->cascadeOnDelete(); $t->foreignId('hostel_id')->constrained()->cascadeOnDelete(); $t->date('check_in'); $t->date('check_out'); $t->integer('guests')->default(1); $t->integer('total_mad'); $t->integer('commission_mad')->default(0); $t->string('status')->default('pending'); $t->timestamps(); });
        Schema::create('favorites', function (Blueprint $t) { $t->id(); $t->foreignId('user_id')->constrained()->cascadeOnDelete(); $t->foreignId('place_id')->constrained()->cascadeOnDelete(); $t->timestamps(); $t->unique(['user_id', 'place_id']); });
    }
    public function down(): void { Schema::dropIfExists('favorites'); Schema::dropIfExists('bookings'); Schema::dropIfExists('hostels'); Schema::dropIfExists('places'); Schema::dropIfExists('cities'); }
};
