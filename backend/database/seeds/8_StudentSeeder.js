/* eslint-disable class-methods-use-this */
/*
|--------------------------------------------------------------------------
| StudentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const { getRole } = require('../../app/Utils');

const Module = use('App/Models/Module');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const createStudent = async (studentRole, module) => {
  const random = Math.floor(Math.random() * (3 - 0) + 0);
  let registrationStatus;
  switch (random) {
    case 1:
      registrationStatus = 'paying';
      break;
    case 2:
      registrationStatus = 'verifying payment';
      break;
    case 3:
    default:
      registrationStatus = 'registered';
      break;
  }

  const student = await Factory.model('App/Models/User').create({
    registration_status: registrationStatus,
  });
  await student.roles().attach([studentRole.id]);
  await student.modulesAsStudent().attach([module.id]);
  if (module.name === 'M-0') {
    student.clan_id = module.clan_id;
    student.save();
  }
};

class StudentSeeder {
  async run() {
    const studentRole = await getRole('student');

    const module1 = await Module.query()
      .where({ name: 'M-0' })
      .firstOrFail();
    const module2 = await Module.query()
      .where({ name: 'M-1' })
      .firstOrFail();
    const module3 = await Module.query()
      .where({ name: 'M-2' })
      .firstOrFail();

    // Module 1
    await createStudent(studentRole, module1);
    await createStudent(studentRole, module1);
    await createStudent(studentRole, module1);
    await createStudent(studentRole, module1);
    await createStudent(studentRole, module1);

    // Module 2
    await createStudent(studentRole, module2);
    await createStudent(studentRole, module2);
    await createStudent(studentRole, module2);
    await createStudent(studentRole, module2);
    await createStudent(studentRole, module2);

    // Module 3
    await createStudent(studentRole, module3);
    await createStudent(studentRole, module3);
    await createStudent(studentRole, module3);
    await createStudent(studentRole, module3);
    await createStudent(studentRole, module3);
  }
}

module.exports = StudentSeeder;
