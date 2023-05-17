<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->unsignedTinyInteger('id', true);
            $table->string('value', 100)->unique();
            $table->string('color', 7)->unique();
        });

        $this->insertRecords();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }

    private function insertRecords()
    {
        DB::table('categories')->insert([
            ['value' => 'Cliente', 'color' => '#a2d2ff'],
            ['value' => 'Proveedor', 'color' => '#ffafcc'],
            ['value' => 'Funcionario Interno', 'color' => '#cdb4db'],
        ]);
    }
};
