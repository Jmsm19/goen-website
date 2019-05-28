/* eslint-disable class-methods-use-this */
const Hashids = use('Hashids');

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * RoleTransformer class
 *
 * @class RoleTransformer
 * @constructor
 */
class RoleTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      id: Hashids.encode(model.id),
      name: model.name,
    };
  }
}

module.exports = RoleTransformer;
