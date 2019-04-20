/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RoleUserSchema extends Schema {
  up() {
    this.create('role_user', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles');
      table.timestamps();
    });
  }

  down() {
    this.drop('role_user');
  }
}

module.exports = RoleUserSchema;
