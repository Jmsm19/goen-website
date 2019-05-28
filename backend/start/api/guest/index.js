/** @typedef {import('@adonisjs/framework/src/Route/Manager')} Route */

/**
 * Public Routes
 *
 * @param {Route} Route
 */
module.exports = Route => {
  // Must not be logged in
  /** Route prefix: api/auth */
  Route.group(() => {
    Route.post('/login', 'AuthController.login')
      .as('auth.login')
      .validator('LoginUser');

    Route.post('/signup', 'AuthController.signup')
      .as('auth.signup')
      .validator('SignupUser');

    Route.post('/activate', 'AuthController.activateSignup')
      .as('auth.signup')
      .validator('SignupActivate');
  })
    .prefix('api/auth/')
    .middleware('guest');

  // Public routes
  Route.group(() => {
    Route.get('settings', 'SettingController.index').as('settings.index');
  }).prefix('api/');
};
