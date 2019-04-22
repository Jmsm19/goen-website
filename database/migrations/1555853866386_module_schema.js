/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

/** @type {import('@adonisjs/framework/src/Config')} */
const Config = use('Config');

class ModuleSchema extends Schema {
  up() {
    this.create('modules', table => {
      table.increments();
      table.string('name').notNullable();
      table.enum('section', Config.get('constants.sectionLetters')).notNullable();
      table
        .integer('period_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('periods');
      table
        .integer('schedule_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('schedules');
      table
        .integer('price_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('prices');
      table
        .integer('clan_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('clans');
      table
        .integer('instructor_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users');
      table
        .integer('assistant_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users');
      table.timestamps();
    });
  }

  down() {
    this.drop('modules');
  }
}

module.exports = ModuleSchema;
