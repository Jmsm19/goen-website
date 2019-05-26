/** @typedef {import('@adonisjs/framework/src/Route/Manager')} Route */

const adminRoutes = require('./onlyAdmin');
const instructorRoutes = require('./instructor');
const studentRoutes = require('./student');

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

  // Student routes
  studentRoutes(Route);
};
