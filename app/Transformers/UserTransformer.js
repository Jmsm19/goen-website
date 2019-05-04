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
  static get availableInclude() {
    return ['grades', 'modulesAsInstructor'];
  }

  /**
   * This method is used to transform the data.
   * @param {User} model
   */
  async transform(model) {
    return {
      id: Hashids.encode(model.id),
      name: model.name,
      email: model.email,
    };
  }

  async transformWithStudentData(model) {
    const baseUserData = await this.transform(model);

    return {
      ...baseUserData,
      registrationStatus: model.registration_status,
    };
  }

  async transformWithExtra(model) {
    const baseUserData = await this.transform(model);

    const rolesArr = [];
    const roles = await model.roles().fetch();
    roles.toJSON().map(role => rolesArr.push(role.name));

    return {
      ...baseUserData,
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

  includeGrades(user) {
    return this.collection(user.getRelated('grades'), 'GradeTransformer');
  }

  includeModulesAsInstructor(user) {
    return this.collection(user.getRelated('modulesAsInstructor'), 'ModuleTransformer');
  }
}

module.exports = UserTransformer;
