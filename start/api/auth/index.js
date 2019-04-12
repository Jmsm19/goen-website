/** @typedef {import('@adonisjs/framework/src/Route/Manager')} Route */

/**
 * Auth Routes (Login, Logout, etc.)

 * @param {Route} Route
 */
module.exports = Route => {
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

  Route.group(() => {
    Route.get('/user', 'AuthController.getUser').as('auth.user');
  })
    .prefix('api/auth/')
    .middleware('auth');
};
