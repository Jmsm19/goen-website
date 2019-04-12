/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('../Models/User')} User */

/** @type {import('../Exceptions/RoleNotAllowedException')} */
const RoleNotAllowedException = use('App/Exceptions/RoleNotAllowedException');
class CheckRole {
  /**
   * @param {object} ctx
   * @param {object} ctx.auth
   * @param {User} ctx.auth.user
   * @param {Function} next
   * @param {Array} roles
   */
  // eslint-disable-next-line consistent-return
  async handle({ auth }, next, roles) {
    const { user } = auth;
    const hasRole = await user.hasAnyRole(roles);
    if (!hasRole) {
      throw new RoleNotAllowedException();
    }
    await next();
  }
}

module.exports = CheckRole;
