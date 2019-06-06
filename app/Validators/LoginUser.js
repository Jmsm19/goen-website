/* eslint-disable class-methods-use-this */
class LoginUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: 'required|string|email',
      password: 'required|string',
      remember_me: 'boolean',
    };
  }
}

module.exports = LoginUser;
