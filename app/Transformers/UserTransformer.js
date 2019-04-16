/* eslint-disable class-methods-use-this */
const Hashids = use('Hashids');
const BumblebeeTransformer = use('Bumblebee/Transformer');

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      id: Hashids.encode(model.id),
      name: model.name,
      email: model.email,

      nationalId: model.national_id.toString(),
      phoneNumber: model.phone_number,
      birthDate: model.birth_date,
      registrationStatus: model.registration_status,
      active: !!model.active,
    };
  }
}

module.exports = UserTransformer;
