/* eslint-disable class-methods-use-this */
class GetSenpaiModules {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      role: 'required|string',
      id: 'required|string',
    };
  }
}

module.exports = GetSenpaiModules;
