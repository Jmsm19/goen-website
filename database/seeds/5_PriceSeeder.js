/* eslint-disable class-methods-use-this */
/*
|--------------------------------------------------------------------------
| PriceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('../../app/Models/Price')} */
const Price = use('App/Models/Price');

class PriceSeeder {
  async run() {
    await Price.create({
      amount: '1000',
    });

    await Price.create({
      amount: '2000',
    });

    await Price.create({
      amount: '3000',
    });
  }
}

module.exports = PriceSeeder;
