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
    });
  }

  down() {
    this.drop('grades');
  }
}

module.exports = GradeSchema;
