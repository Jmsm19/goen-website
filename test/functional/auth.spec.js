/** @type {typeof import('@adonisjs/vow/src/Suite')} */
const { test, trait } = use('Test/Suite')('Auth');

/** @type {import('@adonisjs/framework/src/Event')} */
const Event = use('Event');

/** @type {import('@adonisjs/mail/src/Mail')} */
const Mail = use('Mail');

/** @type {import('@adonisjs/antl/src/Antl')} */
const { formatMessage } = use('Antl');

const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');

test('it registers an user', async ({ assert, client }) => {
  Event.fake();

  const userData = {
    name: 'Test User Name',
    email: 'testEmail@gmail.com',
    nationalId: '20689290',
    password: '20689293',
    password_confirmation: '20689293',
    birthDate: '1992-01-09',
    phoneNumber: '0424-6539972',
  };

  const response = await client
    .post('api/auth/signup')
    .send(userData)
    .end();

  // Assert event
  const recentEvent = Event.pullRecent();
  assert.equal(recentEvent.event, 'new::user');
  Event.restore();

  // Assert response
  response.assertStatus(201);
  response.assertJSONSubset({
    message: formatMessage('auth.successfulSignup'),
  });
});

test('it gets the logged in user', async ({ client }) => {
  const user = await User.find(1);

  const response = await client
    .get('api/auth/user')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    data: user.toJSON(),
  });
});

test('it shows error on invalid activation token', async ({ assert, client }) => {
  const response = await client
    .post('api/auth/activate')
    .send({ token: '123465798' })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: formatMessage('auth.invalidActivationToken'),
  });
});

test('it handles activation token correctly', async ({ assert, client }) => {
  Event.fake();

  let user = await User.find(1);

  // User is not active
  assert.equal(user.active, false);
  // User email is not verified
  assert.isNull(user.email_verified_at);

  const response = await client
    .post('api/auth/activate')
    .send({ token: user.activation_token })
    .end();

  // Assert email
  const recentEvent = Event.pullRecent();
  assert.equal(recentEvent.event, 'verified::user');
  Event.restore();

  // Assert response
  user = await User.find(1);
  response.assertStatus(200);
  assert.equal(user.active, true);
  assert.equal(user.activation_token, '');

  response.assertJSONSubset({
    data: {
      ...user.toJSON(),
      active: true,
    },
  });
});

test('it shows validations errors on missing data (name, nationalId)', async ({ client }) => {
  const userData = {
    email: 'testEmail@gmail.com',
    password: '20689293',
    password_confirmation: '20689293',
    birthDate: '1992-01-09',
    phoneNumber: '0424-6539972',
  };

  const response = await client
    .post('api/auth/signup')
    .send(userData)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    code: 'E_VALIDATION_FAILED',
    error: [
      { field: 'name', validation: 'required' },
      {
        field: 'nationalId',
        validation: 'required',
      },
    ],
    status: 400,
  });
});