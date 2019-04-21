/** @typedef {import('@adonisjs/framework/src/Route/Manager')} Route */

/**
 * Auth Routes (Login, Logout, etc.)

 * @param {Route} Route
 */
module.exports = Route => {
  Route.group(() => {
    Route.get('/user', 'AuthController.getUser').as('auth.user');
    Route.post('/logout', 'AuthController.logout').as('auth.logout');
  })
    .prefix('api/auth/')
    .middleware('auth');
};
