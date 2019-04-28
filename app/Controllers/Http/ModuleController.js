/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('adonis-bumblebee/src/Bumblebee')} Bumblebee */

/** @type {typeof import('../../Models/Module')} */
const Module = use('App/Models/Module');

/**
 * Resourceful controller for interacting with modules
 */
class ModuleController {
  /**
   * Show a list of all modules.
   * GET modules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {}

  /**
   * Render a form to be used for creating a new module.
   * GET modules/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async create({ request, response }) {}

  /**
   * Create/save a new module.
   * POST modules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single module.
   * GET modules/:id
   *
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {String} ctx.params.id
   * @param {Bumblebee} ctx.transform
   */
  async show({ params, transform }) {
    const { id } = params;
    const module = await Module.findByHashOrFail(id);

    return transform
      .include(['clan', 'price', 'schedule', 'instructor', 'assistant', 'students.grades'])
      .item(module, 'ModuleTransformer');
  }

  /**
   * Render a form to update an existing module.
   * GET modules/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async edit({ params, request, response }) {}

  /**
   * Update module details.
   * PUT or PATCH modules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a module with id.
   * DELETE modules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ModuleController;
