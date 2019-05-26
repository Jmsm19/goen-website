const BumblebeeTransformer = use('Bumblebee/Transformer');
const Hashids = use('Hashids');
const Config = use('Config');

/**
 * ModuleTransformer class
 *
 * @class ModuleTransformer
 * @constructor
 */
class ModuleTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return ['schedule', 'clan', 'price', 'period', 'instructor', 'assistant'];
  }

  static get availableInclude() {
    return ['students'];
  }

  /**
   * This method is used to transform the data.
   */
  // eslint-disable-next-line class-methods-use-this
  async transform(module) {
    const studentCount = await module.students().getCount();
    const maxStudentsPerModule = Config.get('constants.maxStudentsPerModule');

    return {
      id: Hashids.encode(module.id),
      name: module.name,
      section: module.section,
      fullName: `${module.name} - ${module.section}`,
      availableSlots: maxStudentsPerModule - studentCount,
    };
  }

  // async transformWithStudentCount(module) {

  //   return {
  //     ...this.transform(module),
  //     availableSlots: studentCount - maxStudentsPerModule,
  //   };
  // }

  includeClan(module) {
    return this.item(module.getRelated('clan'), 'ClanTransformer');
  }

  includePrice(module) {
    return this.item(module.getRelated('price'), 'PriceTransformer');
  }

  includePeriod(module) {
    return this.item(module.getRelated('period'), 'PeriodTransformer');
  }

  includeSchedule(module) {
    return this.item(module.getRelated('schedule'), 'ScheduleTransformer');
  }

  includeInstructor(module) {
    return this.item(module.getRelated('instructor'), 'UserTransformer');
  }

  includeAssistant(module) {
    return this.item(module.getRelated('assistant'), 'UserTransformer');
  }

  includeStudents(module) {
    return this.collection(module.getRelated('students'), 'UserTransformer.withStudentData');
  }
}

module.exports = ModuleTransformer;
