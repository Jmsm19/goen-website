/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

/** @type {typeof import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers');

// Auth routes (Login, Logout, etc)
require('./api/auth')(Route);

// Public (Guest) routes
require('./api/guest')(Route);

// Routes that require an user Role
require('./api/byRoles')(Route);

Route.any('*', ({ response }) => {
  response.download(Helpers.publicPath('index.html'));
});
