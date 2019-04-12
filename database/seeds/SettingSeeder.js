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

class SettingSeeder {
  async run() {
    await Setting.create({
      user_signup_active: true,
    });
  }
}

module.exports = SettingSeeder;
