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

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
Factory.blueprint('App/Models/User', async (faker, i, data) => {
  const email = faker.email();
  const active = data.active !== undefined ? data.active : 1;

  return {
    name: faker.name(),
    email,
    national_id: faker.ssn({ dashes: false }),
    password: await Hash.make(faker.password()),
    birth_date: faker.date(),
    phone_number: faker.phone(),
    active,
    email_verified_at: active ? new Date() : null,
    activation_token: active ? '' : await Hash.make(email),
    ...data,
  };
});

Factory.blueprint('App/Models/Clan', async faker => ({
  name: faker.name(),
  picture: faker.url(),
}));
