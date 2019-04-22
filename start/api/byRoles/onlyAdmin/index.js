/** @typedef {import('@adonisjs/framework/src/Route/Manager')} Route */

/**
 * Routes that require roles (and authentication)
 *
 * @param {Route} Route
 */
module.exports = Route => {
  // Admin routes
  Route.group(() => {
    // Require authentication
    Route.resource('clans', 'ClanController')
      .apiOnly()
      .except(['index'])
      .validator(new Map([[['clans.store'], ['StoreClan']], [['clans.update'], ['UpdateClan']]]));
  })
    .prefix('api/')
    .middleware(['auth', 'verified', 'role:admin']);
};
