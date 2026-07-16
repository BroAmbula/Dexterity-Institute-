<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title')->unique();
            $table->string('school'); // Identifies the specific sub-school
            $table->text('tagline')->nullable();
            $table->text('description');
            $table->string('duration');
            $table->string('delivery_mode');
            $table->string('eligibility');
            $table->decimal('fee_usd', 10, 2);
            $table->decimal('exchange_rate', 10, 2)->default(130.00);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};