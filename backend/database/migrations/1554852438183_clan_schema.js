/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ClanSchema extends Schema {
  up() {
    this.create('clans', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('picture').nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('clans');
  }
}

module.exports = ClanSchema;
