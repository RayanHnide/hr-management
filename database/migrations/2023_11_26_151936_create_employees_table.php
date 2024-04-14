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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();

            $table->string('code');
            $table->string('fullName');
            $table->string('motherName');
            $table->dateTime('birthDate');
            $table->string('placeOfBirth');

            $table->string('Constraint');   // القيد
            $table->string('nationalId');
            $table->string('education')->nullable();
            $table->string('specialization')->nullable();
            $table->integer('mainSalary');

            $table->string('phone');
            $table->string('email')->unique();
            $table->string('photo')->nullable();
            $table->string('pdfFile')->nullable();
            $table->integer('salary');

            $table->string('vacation')->nullable();
            $table->string('position');  //المنصب الوظيفي
            $table->string('department');
            $table->dateTime('startDate');
            $table->dateTime('endDate')->nullable();

            $table->string('experience')->nullable();
            $table->integer('rate')->nullable();
            $table->string('changeSalary')->nullable();
            $table->string('note')->nullable();
            $table->string('lastWork')->nullable();

            $table->unsignedInteger('branchId');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employs');
    }
};
