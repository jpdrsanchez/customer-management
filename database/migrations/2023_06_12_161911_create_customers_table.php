<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('document')->unique();
            $table->timestamp('birthdate');
            $table->enum('gender', ['male', 'female']);
            $table->string('address');
            $table->string('state');
            $table->string('city');
            $table->index(['address', 'state', 'city']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
