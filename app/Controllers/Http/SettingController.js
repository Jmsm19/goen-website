/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const { forLocale } = use('Antl');

const { camelCaseToSnakeCase } = require('../../Utils');

/** @type {typeof import('../../Models/Setting')} */
const Setting = use('App/Models/Setting');

/**
 * Resourceful controller for interacting with settings
 */
class SettingController {
  /**
   * Show a list of all settings.
   * GET settings
   *
   * @param {object} ctx
   * @param {Bumblebee} ctx.transform
   */
  async index({ transform }) {
    const settings = await Setting.firstOrFail();

    return transform.item(settings, 'SettingTransformer');
  }

  /**
   * Update setting details.
   * PUT or PATCH settings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {String} ctx.locale
   */
  async update({ request, locale }) {
    const { settingName, value } = request.all();
    const setting = await Setting.firstOrFail();

    setting.merge({ [camelCaseToSnakeCase(settingName)]: value });
    await setting.save();

    return {
      message: forLocale(locale).formatMessage('models.settingUpdated'),
    };
  }
}

module.exports = SettingController;
