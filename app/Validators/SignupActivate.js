/* eslint-disable class-methods-use-this */
class SignupActivate {
  get rules() {
    return {
      token: 'required|string',
    };
  }
}

module.exports = SignupActivate;
