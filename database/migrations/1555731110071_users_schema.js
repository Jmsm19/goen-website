/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

const Env = use('Env');

class UsersSchema extends Schema {
  up() {
    this.table('users', table => {
      table
        .integer('clan_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('clans')
        .onDelete('SET NULL')
        .after('birth_date');
    });
  }

  down() {
    this.table('users', table => {
      if (Env.get('DB_CONNECTION') !== 'sqlite') {
        table.dropForeign('clan_id');
      }

      table.dropColumn('clan_id');
    });
  }
}

module.exports = UsersSchema;
