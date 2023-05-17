<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_admin')->default(false);
            $table->string('name', 100);
            $table->string('last_name', 100)->nullable();
            $table->unsignedInteger('document_number')->unique();
            $table->string('email', 150)->unique();
            $table->string('country_code', 5);
            $table->string('residence_address', 180)->nullable();
            $table->unsignedInteger('phone_number');
            $table->string('password');

            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
