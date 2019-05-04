/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('adonis-bumblebee/src/Bumblebee')} Bumblebee */

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User');

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Bumblebee} ctx.transform
   */
  async index({ transform }) {
    const users = await User.all();

    return transform.collection(users, 'UserTransformer');
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {String} ctx.params.id
   * @param {Bumblebee} ctx.transform
   */
  async show({ params, transform }) {
    const { id } = params;
    const user = await User.findByHashOrFail(id);

    return transform.item(user, 'UserTransformer.withExtra');
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = UserController;
