<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPricesColumnsToSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->integer('intro_module_price_id')->unsigned()->nullable();
            $table->integer('basic_modules_price_id')->unsigned()->nullable();
            $table->integer('intermediate_modules_price_id')->unsigned()->nullable();
            $table->integer('advance_modules_price_id')->unsigned()->nullable();
            $table->integer('other_activities_price_id')->unique()->unsigned()->nullable();

            if (env('APP_ENV') !== 'testing') {
                $table->foreign('intro_module_price_id')->references('id')->on('prices')
                    ->onDelete('set null');
                $table->foreign('basic_modules_price_id')->references('id')->on('prices')
                    ->onDelete('set null');
                $table->foreign('intermediate_modules_price_id')->references('id')->on('prices')
                    ->onDelete('set null');
                $table->foreign('advance_modules_price_id')->references('id')->on('prices')
                    ->onDelete('set null');
                $table->foreign('other_activities_price_id')->references('id')->on('prices')
                    ->onDelete('set null');
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
        Schema::table('settings', function (Blueprint $table) {
            if (env('APP_ENV') !== 'testing') {
                $table->dropForeign(['intro_module_price_id']);
                $table->dropForeign(['basic_modules_price_id']);
                $table->dropForeign(['intermediate_modules_price_id']);
                $table->dropForeign(['advance_modules_price_id']);
                $table->dropForeign(['other_activities_price_id']);
            }

            $table->dropColumn([
                'intro_module_price_id',
                'basic_modules_price_id',
                'intermediate_modules_price_id',
                'advance_modules_price_id',
                'other_activities_price_id'
            ]);
        });
    }
}
