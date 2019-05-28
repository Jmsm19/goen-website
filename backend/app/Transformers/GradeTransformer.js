/* eslint-disable class-methods-use-this */
const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * GradeTransformer class
 *
 * @class GradeTransformer
 * @constructor
 */
class GradeTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(grade) {
    return {
      id: grade.id,
      moduleId: grade.module_id,
      amount: grade.amount,
    };
  }
}

module.exports = GradeTransformer;
