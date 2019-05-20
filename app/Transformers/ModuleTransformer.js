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
    return ['schedule', 'clan', 'price', 'period', 'instructor', 'assistant'];
  }

  static get availableInclude() {
    return ['students'];
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
      instructorId: Hashids.encode(module.instructor_id),
      assistantId: Hashids.encode(module.assistant_id),
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
