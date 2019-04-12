/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const { forLocale } = use('Antl');

/** @type {typeof import('../../Models/Clan')} */
const Clan = use('App/Models/Clan');

/**
 * Resourceful controller for interacting with clans
 */
class ClanController {
  /**
   * Show a list of all clans.
   * GET clans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const { middlewareError, middlewareErrorStatus } = request;

    if (request.middlewareError) {
      return response.status(middlewareErrorStatus).json(middlewareError);
    }

    const clans = await Clan.all();
    return {
      data: clans.toJSON(),
    };
  }

  /**
   * Create/save a new clan.
   * POST clans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const newClan = await Clan.create(request.only(['name', 'picture']));
    return {
      data: newClan.toJSON(),
    };
  }

  /**
   * Display a single clan.
   * GET clans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {
    const { id } = params;
    const clan = await Clan.findOrFail(id);
    return {
      data: clan.toJSON(),
    };
  }

  /**
   * Update clan details.
   * PUT or PATCH clans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update({ params, request }) {
    const { id } = params;
    const clan = await Clan.findOrFail(id);
    await clan.merge(request.only(['name', 'picture']));
    return {
      data: clan.toJSON(),
    };
  }

  /**
   * Delete a clan with id.
   * DELETE clans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, locale }) {
    const { id } = params;
    const clan = await Clan.find(id);
    await clan.delete();
    return {
      message: forLocale(locale).formatMessage('models.deleted', {
        model: forLocale(locale).formatMessage('models.clan'),
      }),
    };
  }
}

module.exports = ClanController;
