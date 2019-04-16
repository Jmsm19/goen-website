/** @type {typeof import('@adonisjs/vow/src/Suite')} */
const { test, trait } = use('Test/Suite')('Clan');

const { formatMessage } = use('Antl');
const Hashids = use('Hashids');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('../../app/Models/Role')} */
const Role = use('App/Models/Role');

/** @type {typeof import('../../app/Models/Clan')} */
const Clan = use('App/Models/Clan');

const { getTransformedResponse } = require('../mocks');

const createAdminUser = async () => {
  const adminRole = await Role.find(1);
  const user = await Factory.model('App/Models/User').create();
  await user.roles().attach(adminRole.id);
  return user;
};

trait('Test/ApiClient');
trait('Auth/Client');

test('it gets a list of clans', async ({ client }) => {
  const clans = await Clan.all();

  const response = await client.get('api/clans').end();
  const expectedResponse = await getTransformedResponse(clans, 'ClanTransformer', true);

  response.assertStatus(200);
  response.assertJSON(expectedResponse);
});

test('it stores a new clan', async ({ client }) => {
  const user = await createAdminUser();

  const data = {
    name: 'New Clan',
    picture: 'New Clan picture',
  };

  const response = await client
    .post('api/clans')
    .send(data)
    .loginVia(user, 'jwt')
    .end();

  const expectedResponse = await getTransformedResponse(
    { id: Hashids.decode(response.body.data.id), ...data },
    'ClanTransformer',
  );

  response.assertStatus(200);
  response.assertJSON(expectedResponse);
});

test('it shows a single clan based on id', async ({ client }) => {
  const user = await createAdminUser();
  const clan = await Clan.find(1);

  const hashedId = Hashids.encode(1);

  const response = await client
    .get(`api/clans/${hashedId}`)
    .loginVia(user, 'jwt')
    .end();

  const expectedResponse = await getTransformedResponse(clan, 'ClanTransformer');

  response.assertStatus(200);
  response.assertJSON(expectedResponse);
});

test('it updates a clan', async ({ client }) => {
  const user = await createAdminUser();
  const clan = await Clan.find(1);

  const newName = 'Updated Clan Name';
  const hashedId = Hashids.encode(1);

  const response = await client
    .put(`api/clans/${hashedId}`)
    .send({ name: newName })
    .loginVia(user, 'jwt')
    .end();

  const expectedResponse = await getTransformedResponse(clan, 'ClanTransformer');

  response.assertStatus(200);
  response.assertJSON({
    data: {
      ...expectedResponse.data,
      name: newName,
    },
  });
});

test('it deletes a clan', async ({ assert, client }) => {
  const user = await createAdminUser();
  const hashedId = Hashids.encode(1);

  const response = await client
    .delete(`api/clans/${hashedId}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.isNull(await Clan.find(hashedId));
  response.assertJSON({
    message: formatMessage('models.deleted', {
      model: formatMessage('models.clan'),
    }),
  });
});
