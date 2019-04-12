/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/
/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

const Role = use('App/Models/Role');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
Factory.blueprint('App/Models/User', async faker => ({
  name: faker.name(),
  email: faker.email(),
  national_id: faker.ssn({ dashed: false }),
  password: await Hash.make(faker.password()),
  birth_date: faker.date(),
  phone_number: faker.phone(),
}));

Factory.blueprint('App/Models/Clan', async faker => ({
  name: faker.name(),
  picture: faker.url(),
}));
