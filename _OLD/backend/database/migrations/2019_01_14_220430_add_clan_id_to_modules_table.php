<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddClanIdToModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('modules', function (Blueprint $table) {
            $table->integer('clan_id')->unsigned()->nullable()->after('period_id');

            if (env('APP_ENV') !== 'testing') {
                $table->foreign('clan_id')
                    ->references('id')
                    ->on('clans')
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
        Schema::table('modules', function (Blueprint $table) {
            if (env('APP_ENV') !== 'testing') {
                $table->dropForeign(['clan_id']);
            }

            $table->dropColumn(['clan_id']);
        });
    }
}
