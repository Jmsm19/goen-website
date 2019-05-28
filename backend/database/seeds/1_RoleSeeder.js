/* eslint-disable class-methods-use-this */
/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('../../app/Models/Role')} */
const Role = use('App/Models/Role');

class RoleSeeder {
  async run() {
    await Role.create({
      name: 'admin',
      description: 'Admin role',
    });

    await Role.create({
      name: 'instructor',
      description: 'Instructor role',
    });

    await Role.create({
      name: 'assistant',
      description: 'Assistant role',
    });

    await Role.create({
      name: 'student',
      description: 'Student role',
    });
  }
}

module.exports = RoleSeeder;
