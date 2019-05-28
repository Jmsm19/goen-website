/* eslint-disable class-methods-use-this */
class UpdateSetting {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      settingName: 'string|required',
      value: 'required',
    };
  }
}

module.exports = UpdateSetting;
