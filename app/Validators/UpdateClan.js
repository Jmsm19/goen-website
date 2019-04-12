/* eslint-disable class-methods-use-this */
class UpdateClan {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'string',
      picture: 'string',
    };
  }
}

module.exports = UpdateClan;
