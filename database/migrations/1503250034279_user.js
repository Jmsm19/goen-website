/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments();
      table.string('name', 80).notNullable();
      table
        .integer('national_id')
        .unique()
        .nullable();
      table
        .string('email', 254)
        .notNullable()
        .unique();
      table.timestamp('email_verified_at').nullable();
      table.string('password', 60).notNullable();
      table.string('phone_number');
      table.date('birth_date');
      table
        .integer('clan_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('clans');
      table
        .enum('registration_status', ['idle', 'paying', 'verifying payment', 'registered'])
        .default('idle');
      table.boolean('active').defaultTo(false);
      table.string('activation_token');
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
