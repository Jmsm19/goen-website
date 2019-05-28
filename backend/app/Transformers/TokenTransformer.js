/* eslint-disable class-methods-use-this */
const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * TokenTransformer class
 *
 * @class TokenTransformer
 * @constructor
 */
class TokenTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      type: model.type,
      token: model.token,
      refreshToken: model.refreshToken,
    };
  }
}

module.exports = TokenTransformer;
