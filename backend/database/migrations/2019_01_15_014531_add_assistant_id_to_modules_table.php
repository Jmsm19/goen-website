<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAssistantIdToModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('modules', function (Blueprint $table) {
            $table->integer('assistant_id')->unsigned()->nullable()->after('instructor_id');

            if (env('APP_ENV') !== 'testing') {
                $table->foreign('assistant_id')
                    ->references('id')
                    ->on('users')
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
                $table->dropForeign(['assistant_id']);
            }

            $table->dropColumn(['assistant_id']);
        });
    }
}
