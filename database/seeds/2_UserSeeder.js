/* eslint-disable class-methods-use-this */
/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const { getRole, getClan } = require('../../app/Utils');

/** @type {import('../../app/Models/User')} */
const User = use('App/Models/User');

class RoleSeeder {
  async run() {
    const kani = await getClan('Kani');
    const kotori = await getClan('Kotori');
    const roleStudent = await getRole('student');
    const roleAdmin = await getRole('admin');
    const roleInstructor = await getRole('instructor');
    const roleAssistant = await getRole('assistant');

    let user = await User.create({
      name: 'Jorge Soto',
      national_id: '20689293',
      email: 'admin@gmail.com',
      password: '123456',
      phone_number: '0424-6539972',
      birth_date: '1992-01-09',
      active: 1,
      email_verified_at: new Date(),
      clan_id: kani.id,
    });
    await user.roles().attach([roleAdmin.id]);

    user = await User.create({
      name: 'Gabriel Flores',
      national_id: '20580431',
      email: 'instructor@gmail.com',
      password: '123456',
      phone_number: '0424-1234567',
      birth_date: '1945-04-20',
      active: 1,
      email_verified_at: new Date(),
      clan_id: kani.id,
    });
    await user.roles().attach([roleInstructor.id]);

    user = await User.create({
      name: 'Asistente Apellido',
      national_id: '123456',
      email: 'assistant@gmail.com',
      password: '123456',
      phone_number: '0424-1234567',
      birth_date: '1998-10-09',
      active: 1,
      email_verified_at: new Date(),
      clan_id: kotori.id,
    });
    await user.roles().attach([roleAssistant.id]);

    user = await User.create({
      name: 'Simón Inferior',
      national_id: '654321',
      email: 'student@gmail.com',
      password: '123456',
      phone_number: '0424-1234567',
      birth_date: '1999-01-01',
      active: 1,
      email_verified_at: new Date(),
      clan_id: kotori.id,
    });
    await user.roles().attach([roleStudent.id]);
  }
}

module.exports = RoleSeeder;
