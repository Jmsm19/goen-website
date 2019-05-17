/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('adonis-bumblebee/src/Bumblebee')} Bumblebee */

const Hashids = use('Hashids');
const Config = use('Config');
const { forLocale } = use('Antl');

/** @type {typeof import('../../Models/Module')} */
const Module = use('App/Models/Module');

/** @type {typeof import('../../Models/Setting')} */
const Setting = use('App/Models/Setting');

/** @type {typeof import('../../Models/Clan')} */
const Clan = use('App/Models/Clan');

/**
 * Resourceful controller for interacting with modules
 */
class ModuleController {
  /**
   * Get Price id for a given module name based on Settings
   *
   * @param {String} moduleName
   * @returns {Number} id
   */
  async getPriceForModule(moduleName) {
    const moduleNumber = +/[0-9]{1,}/.exec(moduleName);
    const settings = await Setting.firstOrFail();

    if (moduleNumber === 0) {
      return settings.intro_module_price_id;
    }
    if (moduleNumber <= 4) {
      return settings.basic_modules_price_id;
    }
    if (moduleNumber <= 12) {
      return settings.intermediate_modules_price_id;
    }
    if (moduleNumber <= 16) {
      return settings.advanced_modules_price_id;
    }

    throw new Error('Invalid module number');
  }

  /**
   * Show a list of all modules.
   * GET modules
   *
   * @param {object} ctx
   * @param {Bumblebee} ctx.transform
   */
  async index({ transform }) {
    const modules = await Module.all();

    return transform
      .include(['price', 'period', 'instructor', 'assistant', 'students.grades'])
      .collection(modules, 'ModuleTransformer');
  }

  /**
   * Create/save a new module.
   * POST modules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Bumblebee} ctx.transform
   */
  async store({ request, transform }) {
    const {
      name,
      clan: clanName,
      period_id: periodId,
      instructor_id: instructorId,
      assistant_id: assistantId,
      schedule_id: scheduleId,
      ...requestValues
    } = request.all();

    const clan = clanName ? await Clan.findByOrFail('name', clanName) : {};
    const priceId = await this.getPriceForModule(name);

    const module = await Module.create({
      ...requestValues,
      name,
      clan_id: clan.id || null,
      price_id: priceId,
      period_id: Hashids.decode(periodId)[0],
      schedule_id: Hashids.decode(scheduleId)[0],
      instructor_id: Hashids.decode(instructorId)[0],
      assistant_id: Hashids.decode(assistantId)[0],
    });

    return transform
      .include(['price', 'period', 'instructor', 'assistant', 'students.grades'])
      .item(module, 'ModuleTransformer');
  }

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
      .include(['price', 'instructor', 'assistant', 'students.grades'])
      .item(module, 'ModuleTransformer');
  }

  /**
   * Update module details.
   * PUT or PATCH modules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, transform }) {
    const { id } = params;
    const module = await Module.findByHashOrFail(id);
    const {
      name,
      clan: clanName,
      schedule_id: scheduleId,
      instructor_id: instructorId,
      assistant_id: assistantId,
    } = request.all();

    const isM0 = name === 'M-0';
    const clan = isM0 ? await Clan.findBy({ name: clanName }) : null;

    module.merge({
      name,
      schedule_id: Hashids.decode(scheduleId)[0],
      instructor_id: Hashids.decode(instructorId)[0],
      assistant_id: Hashids.decode(assistantId)[0],
      clan_id: isM0 ? clan.id : null,
    });
    module.save();

    return transform
      .include(['price', 'instructor', 'assistant', 'students.grades'])
      .item(module, 'ModuleTransformer');
  }

  /**
   * Delete a module with id.
   * DELETE modules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, locale }) {
    const { id } = params;
    const module = await Module.findByHashOrFail(id);

    await module.delete();

    return {
      message: forLocale(locale).formatMessage('models.deleted', {
        model: forLocale(locale).formatMessage('models.module'),
      }),
    };
  }

  /**
   * Get the order of the modules
   * GET modules/order
   *
   */
  async getModuleOrder() {
    return {
      moduleOrder: Config.get('constants.moduleOrder'),
    };
  }

  /**
   * Get available sections for a Module in a Period.
   * GET period/:id/module/:name/sections/availability
   *
   * @param {object} ctx
   */
  async getAvailableSections({ params }) {
    const { id, name } = params;
    const allowedSections = Config.get('constants.sectionLetters');

    const { rows: modules } = await Module.query()
      .where({
        name,
        period_id: Hashids.decode(id)[0],
      })
      .fetch();

    const existingSections = modules.map(module => module.section);
    const availableSections = allowedSections.filter(
      section => !existingSections.includes(section),
    );

    return {
      availableSections,
    };
  }
}

module.exports = ModuleController;
