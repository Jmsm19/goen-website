/** @typedef {import('@adonisjs/framework/src/Route/Manager')} Route */

/**
 * Routes that just require authentication
 *
 * @param {Route} Route
 */
module.exports = Route => {
  /** Route prefix: api/auth/ */
  Route.group(() => {
    Route.get('/user', 'AuthController.getUser').as('auth.user');
    Route.post('/logout', 'AuthController.logout').as('auth.logout');
  })
    .prefix('api/auth/')
    .middleware(['auth', 'verified']);

  /** Route prefix: api/ */
  Route.group(() => {
    Route.resource('clans', 'ClanController')
      .apiOnly()
      .only(['index', 'show']);
  })
    .prefix('api/')
    .middleware(['auth', 'verified']);
};
