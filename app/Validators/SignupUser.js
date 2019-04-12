/* eslint-disable class-methods-use-this */
class SignupUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required|string',
      nationalId: 'required|string|unique:users,national_id',
      email: 'required|string|email|unique:users',
      password: 'required|string|confirmed',
      birthDate: 'required|date',
      phoneNumber: 'required|string',
      roleName: 'string',
    };
  }
}

module.exports = SignupUser;
