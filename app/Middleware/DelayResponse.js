/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Env = use('Env');

class DelayResponse {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request }, next) {
    // call next to advance the request

    if (Env.get('NODE_ENV') === 'development') {
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, Env.get('RESPONSE_DELAY'));
      });
    }

    await next();
  }
}

module.exports = DelayResponse;
