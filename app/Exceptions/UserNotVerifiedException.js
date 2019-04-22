/* eslint-disable class-methods-use-this */
const { LogicalException } = require('@adonisjs/generic-exceptions');

/** @type {import('@adonisjs/antl/src/Antl')} */
const Antl = use('Antl');

class UserNotVerifiedException extends LogicalException {
  constructor() {
    super('', 401, 'E_USER_NOT_VERIFIED');
  }

  /**
   * Handle this exception by itself
   */
  handle(error, { auth, response, locale }) {
    const { status, code } = error;
    const { user } = auth;
    return response.status(status).json({
      status,
      code,
      error: Antl.forLocale(user.preferred_locale || locale).formatMessage('auth.userNotVerified'),
    });
  }
}

module.exports = UserNotVerifiedException;
