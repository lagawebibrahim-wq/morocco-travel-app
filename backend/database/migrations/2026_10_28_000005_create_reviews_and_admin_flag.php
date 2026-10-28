<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('reviews', function (Blueprint $t) {
            $t->id(); $t->foreignId('user_id')->constrained()->cascadeOnDelete(); $t->foreignId('place_id')->constrained()->cascadeOnDelete();
            $t->integer('rating'); $t->text('comment')->nullable(); $t->timestamps(); $t->unique(['user_id', 'place_id']);
        });
        Schema::table('users', function (Blueprint $t) { $t->boolean('is_admin')->default(false); });
    }
    public function down(): void {
        Schema::dropIfExists('reviews');
        Schema::table('users', function (Blueprint $t) { $t->dropColumn('is_admin'); });
    }
};
