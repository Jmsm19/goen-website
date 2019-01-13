<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddScheduleIdColumnToModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('modules', function (Blueprint $table) {
            if (env('APP_ENV') !== 'testing') {
                $table->integer('schedule_id')->unsigned()->after('period_id');
                $table->foreign('schedule_id')
                    ->references('id')
                    ->on('schedules')
                    ->onDelete('cascade');
            } else {
                $table->integer('schedule_id')->unsigned()->after('period_id')->nullable();
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
                $table->dropForeign(['schedule_id']);
            }

            $table->dropColumn(['schedule_id']);
        });
    }
}
