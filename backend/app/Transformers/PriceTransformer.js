/* eslint-disable class-methods-use-this */
const BumblebeeTransformer = use('Bumblebee/Transformer');
const Hashids = use('Hashids');

/**
 * PriceTransformer class
 *
 * @class PriceTransformer
 * @constructor
 */
class PriceTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(price) {
    return {
      id: Hashids.encode(price.id),
      amount: price.amount,
    };
  }
}

module.exports = PriceTransformer;
