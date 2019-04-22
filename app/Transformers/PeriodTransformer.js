/* eslint-disable class-methods-use-this */
const BumblebeeTransformer = use('Bumblebee/Transformer');
const Hashids = use('Hashids');

/**
 * PeriodTransformer class
 *
 * @class PeriodTransformer
 * @constructor
 */
class PeriodTransformer extends BumblebeeTransformer {
  static get availableInclude() {
    return ['modules'];
  }

  /**
   * This method is used to transform the data.
   */
  transform(period) {
    return {
      id: Hashids.encode(period.id),
      name: period.name,
      year: period.year,
      active: period.active,
      signupFrom: period.signup_from,
      signupUntil: period.signup_until,
    };
  }

  includeModules(period) {
    return this.collection(period.getRelated('modules'), 'ModuleTransformer');
  }
}

module.exports = PeriodTransformer;
