/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

const Helpers = use('Helpers');

Route.group(() => {})
  .prefix('api/')
  .formats(['json'], true);

Route.any('*', ({ response }) => {
  response.download(Helpers.publicPath('index.html'));
});
