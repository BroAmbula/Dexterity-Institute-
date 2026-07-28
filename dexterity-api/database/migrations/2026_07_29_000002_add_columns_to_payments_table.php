<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            if (!Schema::hasColumn('payments', 'user_id')) $table->foreignId('user_id')->nullable()->after('id')->constrained()->nullOnDelete();
            if (!Schema::hasColumn('payments', 'course_id')) $table->foreignId('course_id')->nullable()->after('user_id')->constrained()->nullOnDelete();
            if (!Schema::hasColumn('payments', 'phone_number')) $table->string('phone_number')->nullable()->after('course_id');
            if (!Schema::hasColumn('payments', 'amount_paid')) $table->decimal('amount_paid', 10, 2)->default(0)->after('phone_number');
            if (!Schema::hasColumn('payments', 'currency')) $table->string('currency')->default('KES')->after('amount_paid');
            if (!Schema::hasColumn('payments', 'status')) $table->string('status')->default('completed')->after('currency');
            if (!Schema::hasColumn('payments', 'mpesa_receipt')) $table->string('mpesa_receipt')->nullable()->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            foreach (['user_id', 'course_id', 'phone_number', 'amount_paid', 'currency', 'status', 'mpesa_receipt'] as $column) {
                if (Schema::hasColumn('payments', $column)) $table->dropColumn($column);
            }
        });
    }
};