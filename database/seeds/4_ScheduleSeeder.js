/* eslint-disable class-methods-use-this */
/*
|--------------------------------------------------------------------------
| ScheduleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('../../app/Models/Schedule')} */
const Schedule = use('App/Models/Schedule');

class ScheduleSeeder {
  async run() {
    await Schedule.create({
      day: 'Monday',
      from: '08:30',
      until: '10:30',
    });

    await Schedule.create({
      day: 'Thursday',
      from: '10:30',
      until: '12:30',
    });

    await Schedule.create({
      day: 'Sunday',
      from: '02:00',
      until: '04:00',
    });
  }
}

module.exports = ScheduleSeeder;
