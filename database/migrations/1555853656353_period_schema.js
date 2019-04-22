/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PeriodSchema extends Schema {
  up() {
    this.create('periods', table => {
      table.increments();
      table.string('year', 4).notNullable();
      table.string('name').notNullable();
      table.boolean('active').defaultTo(true);
      table.date('signup_from').notNullable();
      table.date('signup_until').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('periods');
  }
}

module.exports = PeriodSchema;
