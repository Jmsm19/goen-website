/** @typedef {import('@adonisjs/framework/src/Route/Manager')} Route */

const adminRoutes = require('./onlyAdmin');

/**
 * Routes that require roles (and authentication)
 *
 * @param {Route} Route
 */
module.exports = Route => {
  // Admin routes
  adminRoutes(Route);
};
