/** @type {typeof import('@adonisjs/vow/src/Suite')} */
const { test, trait } = use('Test/Suite')('Setting');

const { formatMessage } = use('Antl');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('../../app/Models/Setting')} */
const Setting = use('App/Models/Setting');

const { getRole } = require('../../app/Utils');
const { getTransformedResponse } = require('../mocks');

const createUser = async (roleName = 'admin') => {
  const admin = await Factory.model('App/Models/User').create();
  const role = await getRole(roleName);
  await admin.roles().attach([role.id]);
  return admin;
};

trait('Test/ApiClient');
trait('Auth/Client');

test('it returns all settings', async ({ client }) => {
  const response = await client.get('api/settings').end();

  // Assert response
  const settings = await Setting.firstOrFail();
  const expectedResponse = await getTransformedResponse(settings, 'SettingTransformer');

  response.assertStatus(200);
  response.assertJSON(expectedResponse);
});

test('it requires admin role to update settings', async ({ assert, client }) => {
  const user = await createUser('student');
  const settings = await Setting.firstOrFail();

  assert.equal(settings.user_signup_active, true);

  const response = await client
    .put('api/settings')
    .send({ settingName: 'userSignupActive', value: false })
    .loginVia(user)
    .end();

  // Assert response
  response.assertStatus(401);
});

test('it updates settings', async ({ assert, client }) => {
  const user = await createUser();
  const settings = await Setting.firstOrFail();

  assert.equal(settings.user_signup_active, true);

  const response = await client
    .put('api/settings')
    .send({ settingName: 'userSignupActive', value: false })
    .loginVia(user)
    .end();

  // Assert response
  response.assertStatus(200);
  response.assertJSON({
    message: formatMessage('models.settingUpdated'),
  });
});

test('it shows error for missing params while updating settings', async ({ client }) => {
  const user = await createUser();

  const response = await client
    .put('api/settings')
    .send({ settingName: 'userSignupActive' })
    .loginVia(user)
    .end();

  // Assert response
  response.assertStatus(400);
  response.assertJSON({
    status: 400,
    code: 'E_VALIDATION_FAILED',
    error: [
      { message: 'required validation failed on value', field: 'value', validation: 'required' },
    ],
  });
});
