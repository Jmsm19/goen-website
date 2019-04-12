/* eslint-disable class-methods-use-this */
class StoreClan {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required|string|unique',
      picture: 'required|string',
    };
  }
}

module.exports = StoreClan;
