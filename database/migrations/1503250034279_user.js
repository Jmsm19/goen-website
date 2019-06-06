/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

const Config = use('Config');

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments();
      table.string('name', 80).notNullable();
      table
        .integer('national_id')
        .unique()
        .notNullable();
      table
        .string('email', 254)
        .notNullable()
        .unique();
      table.timestamp('email_verified_at').nullable();
      table.string('password', 60).notNullable();
      table.string('phone_number').nullable();
      table.date('birth_date').notNullable();
      table
        .enum('registration_status', ['idle', 'paying', 'verifying payment', 'registered'])
        .defaultTo('idle');
      table.boolean('active').defaultTo(false);
      table.string('activation_token').nullable();
      table.enum('preferred_locale', Config.get('constants.locale')).defaultTo('es');
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
