/* eslint-disable class-methods-use-this */
/** @typedef {import('../Models/User')} User */

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
   * @param {User} model
   */
  async transform(model) {
    const rolesArr = [];
    const roles = await model.roles().fetch();
    roles.toJSON().map(role => rolesArr.push(role.name));

    return {
      id: Hashids.encode(model.id),
      name: model.name,
      email: model.email,

      nationalId: model.national_id.toString(),
      phoneNumber: model.phone_number,
      birthDate: model.birth_date,
      registrationStatus: model.registration_status,
      active: !!model.active,

      isAdmin: rolesArr.includes('admin'),
      isInstructor: rolesArr.includes('instructor'),
      isAssistant: rolesArr.includes('assistant'),
      isStudent: rolesArr.includes('student'),
    };
  }
}

module.exports = UserTransformer;
