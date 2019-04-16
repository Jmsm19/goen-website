/* eslint-disable class-methods-use-this */
const Hashids = use('Hashids');
const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * ClanTransformer class
 *
 * @class ClanTransformer
 * @constructor
 */
class ClanTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      id: Hashids.encode(model.id),
      name: model.name,
      picture: model.picture,
    };
  }
}

module.exports = ClanTransformer;
