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
        .inTable('periods')
        .onDelete('CASCADE');
      table
        .integer('schedule_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('schedules')
        .onDelete('SET NULL');
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
        .inTable('clans')
        .onDelete('SET NULL');
      table
        .integer('instructor_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL');
      table
        .integer('assistant_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL');
      table.timestamps();
    });
  }

  down() {
    this.drop('modules');
  }
}

module.exports = ModuleSchema;
