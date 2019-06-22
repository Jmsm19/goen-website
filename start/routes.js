/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

/** @type {typeof import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers');

// Auth routes (Login, Logout, etc)
require('./api/auth')(Route);

// Public (Guest) routes
require('./api/guest')(Route);

// Routes that require an user Role
require('./api/byRoles')(Route);

/**
 * Handles the return of the React frontend in the public folder
 * @param {object} ctx
 * @param {Response} ctx.response
 */
const handleFrontendFiles = ({ response }) => {
  response.setHeader('Content-Encoding', 'gzip');
  response.send(Helpers.publicPath('index.html'));
};

Route.any('*', handleFrontendFiles);
