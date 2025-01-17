/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class GradeSchema extends Schema {
  up() {
    this.create('grades', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table
        .integer('module_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('modules')
        .onDelete('CASCADE');
      table
        .float('score')
        .unsigned()
        .nullable();
    });
  }

  down() {
    this.drop('grades');
  }
}

module.exports = GradeSchema;
