<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSignupPeriodsColumnsToPeriodTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('periods', function (Blueprint $table) {
            if (env('APP_ENV') !== 'testing') {
                $table->date('signup_from')->after('active');
                $table->date('signup_until')->after('active');
            } else {
                $table->date('signup_from')->nullable();
                $table->date('signup_until')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('periods', function (Blueprint $table) {
            $table->dropColumn(['signup_from', 'signup_until']);
        });
    }
}
