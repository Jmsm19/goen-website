/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RenameModuleStudentSchema extends Schema {
  up() {
    this.rename('module_student', 'module_students');
  }

  down() {
    this.rename('module_students', 'module_student');
  }
}

module.exports = RenameModuleStudentSchema;
