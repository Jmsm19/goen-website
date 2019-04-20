/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UsersSchema extends Schema {
  up() {
    this.table('users', table => {
      table
        .integer('clan_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('clans')
        .after('birth_date');
    });
  }

  down() {
    this.table('users', table => {
      table.dropForeign('clan_id');
      table.dropColumn('clan_id');
    });
  }
}

module.exports = UsersSchema;
