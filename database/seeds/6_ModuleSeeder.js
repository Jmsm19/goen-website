/* eslint-disable class-methods-use-this */
/*
|--------------------------------------------------------------------------
| ModuleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('../../app/Models/Module')} */
const Module = use('App/Models/Module');

/** @type {import('../../app/Models/Period')} */
const Period = use('App/Models/Period');

/** @type {import('../../app/Models/Schedule')} */
const Schedule = use('App/Models/Schedule');

/** @type {import('../../app/Models/Price')} */
const Price = use('App/Models/Price');

/** @type {import('../../app/Models/Role')} */
const Role = use('App/Models/Role');

const { getClan } = require('../../app/Utils');

class ModuleSeeder {
  async run() {
    const clan = await getClan('Usagi');
    const currentPeriod = await Period.query()
      .where('active', true)
      .firstOrFail();

    const availableSchedules = await Schedule.all();
    const amountOfSchedules = availableSchedules.rows.length;
    const availablePrices = await Price.all();
    const amountOfPrices = availablePrices.rows.length;

    const instructor = await Role.query()
      .with('users')
      .where('name', 'instructor')
      .firstOrFail();

    const assistant = await Role.query()
      .with('users')
      .where('name', 'assistant')
      .firstOrFail();

    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

    const createModule = async moduleNumber => {
      const randomSchedule = availableSchedules.rows[getRandomNumber(0, amountOfSchedules)];
      const randomPrice = availablePrices.rows[getRandomNumber(0, amountOfPrices)];

      await Module.create({
        name: `M-${moduleNumber}`,
        section: 'A',
        clan_id: moduleNumber === 0 ? clan.id : null,
        period_id: currentPeriod.id,
        price_id: randomPrice.id,
        schedule_id: randomSchedule.id,
        instructor_id: instructor.id,
        assistant_id: assistant.id,
      });
    };

    await createModule(0);
    await createModule(1);
    await createModule(2);
  }
}

module.exports = ModuleSeeder;
