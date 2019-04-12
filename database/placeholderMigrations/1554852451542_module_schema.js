/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

/** @type {import('@adonisjs/framework/src/Config')} */
const Config = use('Config');

class ModuleSchema extends Schema {
  up() {
    this.create('modules', table => {
      table.increments();
      table.string('name');
      table.enum('section', Config.get('constants.section_letters'));
      table.integer('period_id').unsigned();
      table.integer('schedule_id').unsigned();
      table.integer('price_id').unsigned();
      table
        .integer('clan_id')
        .unsigned()
        .nullable();
      table
        .integer('instructor_id')
        .unsigned()
        .nullable();
      table
        .integer('assistant_id')
        .unsigned()
        .nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('modules');
  }
}

module.exports = ModuleSchema;
