/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ModuleStudentSchema extends Schema {
  up() {
    this.create('module_student', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .integer('module_id')
        .unsigned()
        .references('id')
        .inTable('modules')
        .onDelete('CASCADE');
      table.enum('status', ['current', 'failed', 'passed']).default('current');
      table.timestamps();
    });
  }

  down() {
    this.table('users', table => {
      this.drop('module_student');
    });
  }
}

module.exports = ModuleStudentSchema;
