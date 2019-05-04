/** @typedef {import('@adonisjs/framework/src/Route/Manager')} Route */

/**
 * Routes that require roles (and authentication)
 *
 * @param {Route} Route
 */
module.exports = Route => {
  // Instructor routes
  Route.group(() => {
    Route.get('/:role/:id/modules', 'InstructorController.getModules').as('senpai.modules');
  })
    .prefix('api/')
    .middleware(['auth', 'verified', 'role:admin,instructor']);
};
