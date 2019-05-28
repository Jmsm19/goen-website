/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('adonis-bumblebee/src/Bumblebee')} Bumblebee */

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
   * @param {Bumblebee} ctx.transform
   */
  async index({ transform }) {
    const clans = await Clan.all();

    return transform.collection(clans, 'ClanTransformer');
  }

  /**
   * Create/save a new clan.
   * POST clans
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Bumblebee} ctx.transform
   */
  async store({ request, transform }) {
    const newClan = await Clan.create(request.only(['name', 'picture']));

    return transform.item(newClan, 'ClanTransformer');
  }

  /**
   * Display a single clan.
   * GET clans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Bumblebee} ctx.transform
   */
  async show({ params, transform }) {
    const { id } = params;
    const clan = await Clan.findByHashOrFail(id);

    return transform.item(clan, 'ClanTransformer');
  }

  /**
   * Update clan details.
   * PUT or PATCH clans/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {object} ctx.params
   * @param {String} ctx.params.id
   * @param {Bumblebee} ctx.transform
   */
  async update({ params, request, transform }) {
    const { id } = params;
    const clan = await Clan.findByHashOrFail(id);

    clan.merge(request.only(['name', 'picture']));
    clan.save();

    return transform.item(clan, 'ClanTransformer');
  }

  /**
   * Delete a clan with id.
   * DELETE clans/:id
   *
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {String} ctx.params.id
   * @param {String} ctx.locale
   */
  async destroy({ params, locale }) {
    const { id } = params;
    const clan = await Clan.findByHashOrFail(id);

    await clan.delete();

    return {
      message: forLocale(locale).formatMessage('models.deleted', {
        model: forLocale(locale).formatMessage('models.clan'),
      }),
    };
  }
}

module.exports = ClanController;
