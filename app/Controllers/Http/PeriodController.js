/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('adonis-bumblebee/src/Bumblebee')} Bumblebee */

/** @type {typeof import('@adonisjs/antl/src/Antl')} */
const { forLocale } = use('Antl');

/** @type {typeof import('@adonisjs/framework/src/Config')} */
const Config = use('Config');

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
    const periods = await Period.query()
      .orderBy('created_at', 'desc')
      .fetch();

    return transform
      .include([
        'modules.clan',
        'modules.price',
        'modules.schedule',
        'modules.instructor',
        'modules.assistant',
      ])
      .collection(periods, 'PeriodTransformer');
  }

  /**
   * Create/save a new period.
   * POST periods
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, locale, transform }) {
    // Get current year or take it from request
    const year = request.all().year || new Date().getFullYear();

    // Create Period Name based on the Year's existent periods
    const periodOrder = Config.get('constants.periodOrder');
    const periodsInYear = await Period.query()
      .where({ year })
      .fetch();
    const nextPeriodIndex = periodsInYear.rows.length;
    if (nextPeriodIndex >= periodOrder.length) {
      return response.status(400).json({
        error: forLocale(locale).formatMessage('models.periodLimitReached'),
      });
    }

    // Current period(s) will be marked as inactive (false)
    if (request.all().make_current) {
      await Period.query()
        .where({ active: 1 })
        .update({ active: 0 });
    }

    // Create period with correct name based on period order
    const periodData = {
      year,
      name: periodOrder[nextPeriodIndex],
      active: request.all().make_current || false,
      ...request.only(['signup_from', 'signup_until']),
    };
    const period = await Period.create(periodData);

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
  async destroy({ params, locale }) {
    const { id } = params;
    const period = await Period.findByHashOrFail(id);

    await period.delete();

    return {
      message: forLocale(locale).formatMessage('models.deleted', {
        model: forLocale(locale).formatMessage('models.period'),
      }),
    };
  }

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
        'modules.students.grades',
      ])
      .item(period, 'PeriodTransformer');
  }
}

module.exports = PeriodController;
