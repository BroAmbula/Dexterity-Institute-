<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('partner_submissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('organization_name');
            $table->string('contact_name');
            $table->string('email');
            $table->string('phone');
            $table->text('message');
            $table->boolean('is_reviewed')->default(false);
            $table->timestamps();
        });

        Schema::create('contact_submissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email');
            $table->string('subject');
            $table->text('message');
            $table->boolean('is_resolved')->default(false);
            $table->timestamps();
        });

        Schema::create('audit_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->string('action');
            $table->text('details');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partner_submissions');
        Schema::dropIfExists('contact_submissions');
        Schema::dropIfExists('audit_logs');
    }
};
