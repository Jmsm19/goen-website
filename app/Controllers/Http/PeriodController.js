/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('adonis-bumblebee/src/Bumblebee')} Bumblebee */

/** @type {typeof import('../../Models/Period')} */
const Period = use('App/Models/Period');

/**
 * Resourceful controller for interacting with periods
 */
class PeriodController {
  /**
   * Show a list of all periods.
   * GET periods
   *
   * @param {object} ctx
   * @param {Bumblebee} ctx.transform
   */
  async index({ transform }) {
    const periods = await Period.all();

    return transform.collection(periods, 'PeriodTransformer');
  }

  /**
   * Create/save a new period.
   * POST periods
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single period.
   * GET periods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, transform }) {
    const { id } = params;
    const period = await Period.findByHashOrFail(id);

    return transform
      .include([
        'modules.clan',
        'modules.price',
        'modules.schedule',
        'modules.instructor',
        'modules.assistant',
      ])
      .item(period, 'PeriodTransformer');
  }

  /**
   * Update period details.
   * PUT or PATCH periods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a period with id.
   * DELETE periods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}

  /**
   * Get the currently active Period
   * GET periods/active
   *
   * @param {object} ctx
   * @param {Bumblebee} ctx.transform
   */
  async getActive({ transform }) {
    const period = await Period.query()
      .where({ active: 1 })
      .firstOrFail();

    return transform
      .include([
        'modules.clan',
        'modules.price',
        'modules.schedule',
        'modules.instructor',
        'modules.assistant',
      ])
      .item(period, 'PeriodTransformer');
  }
}

module.exports = PeriodController;
