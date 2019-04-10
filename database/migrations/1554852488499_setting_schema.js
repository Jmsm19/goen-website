/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

const createUnsignedNullableIntCol = (table, name) =>
  table
    .integer(name)
    .unsigned()
    .nullable();

class SettingSchema extends Schema {
  up() {
    this.create('settings', table => {
      table.increments();
      table.boolean('user_signup_active').defaultTo(true);
      createUnsignedNullableIntCol(table, 'intro_module_price_id');
      createUnsignedNullableIntCol(table, 'basic_modules_price_id');
      createUnsignedNullableIntCol(table, 'intermediate_modules_price_id');
      createUnsignedNullableIntCol(table, 'advanced_modules_price_id');
      table.timestamps();
    });
  }

  down() {
    this.drop('settings');
  }
}

module.exports = SettingSchema;
