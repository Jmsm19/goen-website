/* eslint-disable class-methods-use-this */

const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * SettingTransformer class
 *
 * @class SettingTransformer
 * @constructor
 */
class SettingTransformer extends BumblebeeTransformer {
  // static get defaultInclude() {
  //   return [
  //     'intro_module_price_id',
  //     'basic_modules_price_id',
  //     'intermediate_modules_price_id',
  //     'advanced_modules_price_id',
  //   ];
  // }

  /**
   * This method is used to transform the data.
   */
  transform(setting) {
    return {
      userSignupActive: !!setting.user_signup_active,
    };
  }
}

module.exports = SettingTransformer;
