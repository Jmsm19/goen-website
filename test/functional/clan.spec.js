/** @type {typeof import('@adonisjs/vow/src/Suite')} */
const { test, trait } = use('Test/Suite')('Clan');

const { formatMessage } = use('Antl');
const Hashids = use('Hashids');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('../../app/Models/Clan')} */
const Clan = use('App/Models/Clan');

const { getRole } = require('../../app/Utils');
const { getTransformedResponse } = require('../mocks');

const createAdminUser = async () => {
  const admin = await Factory.model('App/Models/User').create();
  const role = await getRole('admin');
  await admin.roles().attach([role.id]);
  return admin;
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
    .loginVia(user, 'api')
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
    .loginVia(user, 'api')
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
    .loginVia(user, 'api')
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
    .loginVia(user, 'api')
    .end();

  response.assertStatus(200);
  assert.isNull(await Clan.find(hashedId));
  response.assertJSON({
    message: formatMessage('models.deleted', {
      model: formatMessage('models.clan'),
    }),
  });
});
