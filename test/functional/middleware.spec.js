/** @type {typeof import('@adonisjs/vow/src/Suite')} */
const { test, trait } = use('Test/Suite')('Middleware');

const Hashids = use('Hashids');

/** @type {import('@adonisjs/antl/src/Antl')} */
const { formatMessage } = use('Antl');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const { getRole } = require('../../app/Utils');

trait('Test/ApiClient');
trait('Auth/Client');

test('CheckRole: it checks for required role before request', async ({ client }) => {
  const clan = await Factory.model('App/Models/Clan').create();
  const user = await Factory.model('App/Models/User').create();

  const hashedId = Hashids.encode(clan.id);

  // Not allow request
  let response = await client
    .delete(`api/clans/${hashedId}`)
    .loginVia(user, 'api')
    .end();

  response.assertStatus(401);
  response.assertJSONSubset({
    error: formatMessage('auth.noPrivileges'),
  });

  // Allow request
  const role = await getRole('admin');
  await user.roles().attach([role.id]);
  response = await client
    .delete(`api/clans/${hashedId}`)
    .loginVia(user, 'api')
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    message: formatMessage('models.deleted', { model: formatMessage('models.clan') }),
  });
});
