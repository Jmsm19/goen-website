/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('adonis-bumblebee/src/Bumblebee')} Bumblebee */

const Hashids = use('Hashids');

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User');

/** @type {typeof import('../../Models/Module')} */
const Module = use('App/Models/Module');

class InstructorController {
  /**
   * Show a list of all users with an instructor role.
   * GET instructors
   *
   * @param {object} ctx
   * @param {Bumblebee} ctx.transform
   */
  async index({ transform }) {
    const instructors = await User.query()
      .hasInstructorRole()
      .fetch();

    return transform.collection(instructors, 'UserTransformer');
  }

  /**
   * Show a modules from an Instructor or Assistant
   * GET /:role/:id/modules
   *
   * @param {object} ctx
   * @param {object} ctx.params
   * @param {String} ctx.params.id
   * @param {Bumblebee} ctx.transform
   */
  async getModules({ params, transform }) {
    const { id, role } = params;
    const decodedId = Hashids.decode(id)[0];

    const modules = await Module.query()
      .where({
        [`${role}_id`]: decodedId,
      })
      .fetch();

    return transform
      .include(['period', 'schedule', 'clan'])
      .collection(modules, 'ModuleTransformer');
  }
}

module.exports = InstructorController;
