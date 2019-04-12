/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PeriodSchema extends Schema {
  up() {
    this.create('periods', table => {
      table.increments();
      table.year('year');
      table.string('name');
      table.boolean('active').defaultTo(true);
      table.timestamps();
    });
  }

  down() {
    this.drop('periods');
  }
}

module.exports = PeriodSchema;
