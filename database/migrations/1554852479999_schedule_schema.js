/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

/** @type {import('@adonisjs/framework/src/Config')} */
const Config = use('Config');

class ScheduleSchema extends Schema {
  up() {
    this.create('schedules', table => {
      table.increments();
      table.enum('day', Config.get('constants.days'));
      table.time('from');
      table.time('until');
      table.timestamps();
    });
  }

  down() {
    this.drop('schedules');
  }
}

module.exports = ScheduleSchema;
