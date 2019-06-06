/* eslint-disable class-methods-use-this */
class StorePeriod {
  get validateAll() {
    return true;
  }

  get rules() {
    const body = this.ctx.request.all();
    return {
      year: 'date|dateFormat:YYYY',
      signup_from: 'required|date',
      signup_until: `required|date|after:${body.signup_from}`,
      make_current: 'boolean',
    };
  }
}

module.exports = StorePeriod;
