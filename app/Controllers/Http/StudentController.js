/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('adonis-bumblebee/src/Bumblebee')} Bumblebee */

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User');

class StudentController {
  /**
   * Show a list of all users with a student role.
   * GET students
   *
   * @param {object} ctx
   * @param {Bumblebee} ctx.transform
   */
  async index({ transform }) {
    const students = await User.query()
      .hasStudentRole()
      .fetch();

    return transform.collection(students, 'UserTransformer');
  }
}

module.exports = StudentController;
