/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {import('../Exceptions/UserNotVerifiedException')} */
const UserNotVerifiedException = use('App/Exceptions/UserNotVerifiedException');

class OnlyVerifiedUser {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth }, next) {
    if (!auth.user.active || !auth.user.email_verified_at) {
      throw new UserNotVerifiedException();
    }

    await next();
  }
}

module.exports = OnlyVerifiedUser;
