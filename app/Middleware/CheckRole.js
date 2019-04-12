/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('../Models/User')} User */

/** @type {import('@adonisjs/antl/src/Antl')} */
const { formatMessage, forLocale } = use('Antl');

class CheckRole {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {object} ctx.auth
   * @param {User} ctx.auth.user
   * @param {String} ctx.locale
   * @param {Function} next
   * @param {Array} roles
   */
  // eslint-disable-next-line consistent-return
  async handle({ auth, request, locale }, next, roles) {
    const { user } = auth;
    const hasRole = await user.hasAnyRole(roles);
    if (!hasRole) {
      request.middlewareErrorStatus = 401;
      request.middlewareError = {
        error: forLocale(locale).formatMessage('auth.noPrivilages'),
      };
    }
    await next();
  }
}

module.exports = CheckRole;
