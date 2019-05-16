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

    Route.resource('schedules', 'ScheduleController').only(['index']);

    Route.resource('periods', 'PeriodController')
      .apiOnly()
      .validator(
        new Map([[['periods.store'], ['StorePeriod']], [['periods.update'], ['UpdatePeriod']]]),
      );

    Route.get('modules/order', 'ModuleController.getModuleOrder').as('modules.order');
    Route.resource('modules', 'ModuleController')
      .apiOnly()
      .validator(new Map([[['modules.store'], ['StoreModule']]]));
    Route.get(
      'period/:id/module/:name/sections/availability',
      'ModuleController.getAvailableSections',
    ).as('modules.sections.available');

    Route.put('settings', 'SettingController.update')
      .validator('UpdateSetting')
      .as('settings.update');
  })
    .prefix('api/')
    .middleware(['auth', 'verified', 'role:admin']);
};
