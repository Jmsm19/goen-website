/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('adonis-bumblebee/src/Bumblebee')} Bumblebee */

const Config = use('Config');
const isWithinRange = require('date-fns/is_within_range');

/** @type {typeof import('@adonisjs/antl/src/Antl')} */
const Antl = use('Antl');

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User');

/** @type {typeof import('../../Models/Module')} */
const Module = use('App/Models/Module');

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

  /**
   * Register user as student in Module
   * GET modules/:id/register
   *
   * @param {object} ctx
   * @param {{ user: User}} ctx.auth
   * @param {Response} ctx.response
   * @param {{ hash: String }} ctx.params
   * @param {String} ctx.locale
   */
  async registerInModule({ response, auth, params, locale }) {
    const { user } = auth;
    const { id } = params;

    const module = await Module.findByHashOrFail(id);

    const isStudentInModule = await user.isStudentIn(module.id);
    if (isStudentInModule) {
      return response.status(400).json({
        message: Antl.forLocale(locale).formatMessage('messages.isStudentInModule'),
      });
    }

    const period = await module.period().fetch();
    const isNotWithinRegistrationThreshold = !isWithinRange(
      new Date(),
      period.signup_from,
      period.signup_until,
    );

    if (isNotWithinRegistrationThreshold) {
      return response.status(400).json({
        message: Antl.forLocale(locale).formatMessage('messages.notWithinRegistrationThreshold'),
      });
    }

    const periodCount = await user
      .modulesAsStudent()
      .where({ period_id: period.id })
      .getCount();
    const isRegisteredInPeriod = periodCount > 0;
    if (isRegisteredInPeriod) {
      return response.status(400).json({
        message: Antl.forLocale(locale).formatMessage('messages.onlyOneModulePerPeriod'),
      });
    }

    const lastModule = await user
      .modulesAsStudent()
      .where({ status: 'passed' })
      .orderBy('created_at', 'desc')
      .first();

    const moduleOrder = Config.get('constants.moduleOrder');
    const moduleIndex = moduleOrder.indexOf(lastModule ? lastModule.name : 'M-0');
    const remainingModules = moduleOrder.slice(lastModule ? moduleIndex + 1 : moduleIndex);
    const nextModule = remainingModules[0];

    if (module.name !== nextModule) {
      return response.status(400).json({
        message: Antl.forLocale(locale).formatMessage('messages.wrongNextModule', {
          module: module.name,
          correctModuleName: nextModule,
        }),
      });
    }

    const moduleHasSpace = await module.hasSpace();
    if (!moduleHasSpace) {
      return response.status(400).json({
        message: Antl.forLocale(locale).formatMessage('messages.moduleFull'),
      });
    }

    await user.modulesAsStudent().attach([module.id]);

    user.registration_status = 'paying';
    user.save();

    return {
      message: Antl.forLocale(locale).formatMessage('messages.moduleSlotSaved'),
    };
  }
}

module.exports = StudentController;
