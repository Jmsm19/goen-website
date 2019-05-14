/* eslint-disable class-methods-use-this */
const Config = use('Config');

class UpdatePeriod {
  get validateAll() {
    return true;
  }

  get rules() {
    const body = this.ctx.request.all();
    const periodNames = Config.get('constants.periodOrder');

    return {
      name: `string|in:${periodNames}`,
      year: 'date|dateFormat:YYYY',
      signup_from: 'date',
      signup_until: `date|after:${body.signup_from}`,
    };
  }
}

module.exports = UpdatePeriod;
