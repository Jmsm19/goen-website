/** @typedef {import('@adonisjs/framework/src/Route/Manager')} Route */

const adminRoutes = require('./onlyAdmin');
const instructorRoutes = require('./instructor');

/**
 * Routes that require roles (and authentication)
 *
 * @param {Route} Route
 */
module.exports = Route => {
  // Admin routes
  adminRoutes(Route);

  // Instructor routes
  instructorRoutes(Route);
};
