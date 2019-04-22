/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

const Env = use('Env');

const createUnsignedIntCol = (table, name) =>
  table
    .integer(name)
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('prices');

class SettingSchema extends Schema {
  up() {
    this.create('settings', table => {
      table.increments();
      table.boolean('user_signup_active').defaultTo(true);
      createUnsignedIntCol(table, 'intro_module_price_id');
      createUnsignedIntCol(table, 'basic_modules_price_id');
      createUnsignedIntCol(table, 'intermediate_modules_price_id');
      createUnsignedIntCol(table, 'advanced_modules_price_id');
    });
  }

  down() {
    this.drop('settings');
  }
}

module.exports = SettingSchema;
