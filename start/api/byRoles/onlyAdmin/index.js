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
    Route.resource('users', 'UserController')
      .apiOnly()
      .only(['destroy']);

    Route.get('instructors', 'InstructorController.index').as('instructors.index');
    Route.get('students', 'StudentController.index').as('students.index');

    Route.resource('clans', 'ClanController')
      .apiOnly()
      .except(['index'])
      .validator(new Map([[['clans.store'], ['StoreClan']], [['clans.update'], ['UpdateClan']]]));

    Route.resource('periods', 'PeriodController')
      .apiOnly()
      .only(['destroy', 'store', 'update']);

    Route.resource('modules', 'ModuleController').apiOnly();
  })
    .prefix('api/')
    .middleware(['auth', 'verified', 'role:admin']);
};
