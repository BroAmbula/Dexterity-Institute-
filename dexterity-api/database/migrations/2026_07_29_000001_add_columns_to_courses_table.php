<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            if (!Schema::hasColumn('courses', 'title')) $table->string('title')->after('id');
            if (!Schema::hasColumn('courses', 'school')) $table->string('school')->nullable()->after('title');
            if (!Schema::hasColumn('courses', 'description')) $table->text('description')->nullable()->after('school');
            if (!Schema::hasColumn('courses', 'duration')) $table->string('duration')->nullable()->after('description');
            if (!Schema::hasColumn('courses', 'delivery_mode')) $table->string('delivery_mode')->nullable()->after('duration');
            if (!Schema::hasColumn('courses', 'eligibility')) $table->text('eligibility')->nullable()->after('delivery_mode');
            if (!Schema::hasColumn('courses', 'fee_usd')) $table->decimal('fee_usd', 10, 2)->default(0)->after('eligibility');
            if (!Schema::hasColumn('courses', 'exchange_rate')) $table->decimal('exchange_rate', 10, 2)->default(130)->after('fee_usd');
            if (!Schema::hasColumn('courses', 'is_active')) $table->boolean('is_active')->default(true)->after('exchange_rate');
        });
    }

    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            foreach (['title', 'school', 'description', 'duration', 'delivery_mode', 'eligibility', 'fee_usd', 'exchange_rate', 'is_active'] as $column) {
                if (Schema::hasColumn('courses', $column)) $table->dropColumn($column);
            }
        });
    }
};