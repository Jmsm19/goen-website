/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class GradeSchema extends Schema {
  up() {
    this.create('grades', table => {
      table.increments();
      table.integer('user_id').unsigned();
      table.integer('module_id').unsigned();
      table
        .float('score')
        .unsigned()
        .nullable();
      table.timestamps();

      table
        .foreign('user_id')
        .references('id')
        .inTable('users');
      // table
      //   .foreign('module_id')
      //   .references('id')
      //   .inTable('module');
    });
  }

  down() {
    this.dropForeign('user_id');
    // this.dropForeign('module_id');
    this.drop('grades');
  }
}

module.exports = GradeSchema;
