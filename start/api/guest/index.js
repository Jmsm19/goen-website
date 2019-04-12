/** @typedef {import('@adonisjs/framework/src/Route/Manager')} Route */

const User = use('App/Models/User');

/**
 * Public Routes
 *
 * @param {Route} Route
 */
module.exports = Route => {
  Route.group(() => {
    Route.resource('clans', 'ClanController')
      .apiOnly()
      .only(['index']);
  })
    .prefix('api/')
    .middleware(['guest']);
};
