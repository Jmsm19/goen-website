/* eslint-disable class-methods-use-this */
/*
|--------------------------------------------------------------------------
| SettingSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('../../app/Models/Setting')} */
const Setting = use('App/Models/Setting');

/** @type {import('../../app/Models/Price')} */
const Price = use('App/Models/Price');

class SettingSeeder {
  async run() {
    const prices = await Price.all();

    await Setting.create({
      user_signup_active: true,
      intro_module_price_id: prices.rows[0].id,
      basic_modules_price_id: prices.rows[0].id,
      intermediate_modules_price_id: prices.rows[1].id,
      advanced_modules_price_id: prices.rows[2].id,
    });
  }
}

module.exports = SettingSeeder;
