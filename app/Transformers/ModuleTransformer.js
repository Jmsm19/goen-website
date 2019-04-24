const BumblebeeTransformer = use('Bumblebee/Transformer');
const Hashids = use('Hashids');

/**
 * ModuleTransformer class
 *
 * @class ModuleTransformer
 * @constructor
 */
class ModuleTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return [];
  }

  static get availableInclude() {
    return ['clan', 'price', 'period', 'schedule', 'instructor', 'assistant', 'students'];
  }

  /**
   * This method is used to transform the data.
   */
  // eslint-disable-next-line class-methods-use-this
  transform(module) {
    return {
      id: Hashids.encode(module.id),
      name: module.name,
      section: module.section,
      fullName: `${module.name} - ${module.section}`,
    };
  }

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
