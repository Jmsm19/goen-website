<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddInstructorIdToModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('modules', function (Blueprint $table) {
            $table->integer('instructor_id')->unsigned()->nullable()->after('name');

            if (env('APP_ENV') !== 'testing') {
                $table->foreign('instructor_id')
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
                $table->dropForeign(['instructor_id']);
            }

            $table->dropColumn(['instructor_id']);
        });
    }
}
