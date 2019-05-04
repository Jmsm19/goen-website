/* eslint-disable class-methods-use-this */
/*
|--------------------------------------------------------------------------
| PeriodSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('../../app/Models/Period')} */
const Period = use('App/Models/Period');

class PeriodSeeder {
  async run() {
    await Period.create({
      year: new Date().getFullYear() - 1,
      name: 'VI',
      active: false,
      signup_from: '2018-12-01',
      signup_until: '2018-12-31',
    });

    await Period.create({
      year: new Date().getFullYear(),
      name: 'I',
      active: false,
      signup_from: '2019-01-01',
      signup_until: '2019-01-31',
    });

    await Period.create({
      year: new Date().getFullYear(),
      name: 'II',
      active: false,
      signup_from: '2019-02-01',
      signup_until: '2019-02-28',
    });

    await Period.create({
      year: new Date().getFullYear(),
      name: 'III',
      active: false,
      signup_from: '2019-03-01',
      signup_until: '2019-03-31',
    });

    await Period.create({
      year: new Date().getFullYear(),
      name: 'IV',
      active: false,
      signup_from: '2019-04-01',
      signup_until: '2019-04-30',
    });

    await Period.create({
      year: new Date().getFullYear(),
      name: 'V',
      active: true,
      signup_from: '2019-05-01',
      signup_until: '2019-05-31',
    });
  }
}

module.exports = PeriodSeeder;
