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
  const student = await Factory.model('App/Models/User').create();
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

    const module1 = await Module.find(1);
    const module2 = await Module.find(2);
    const module3 = await Module.find(3);

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
