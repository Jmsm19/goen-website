/** @typedef {import('@adonisjs/framework/src/Route/Manager')} Route */

/**
 * Routes that just require authentication
 *
 * @param {Route} Route
 */
module.exports = Route => {
  Route.group(() => {
    Route.post('modules/:id/register', 'StudentController.registerInModule').as(
      'student.module.register',
    );
  })
    .prefix('api/')
    .middleware(['auth', 'verified', 'role:student']);
};
