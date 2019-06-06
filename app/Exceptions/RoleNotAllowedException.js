/* eslint-disable class-methods-use-this */
const { LogicalException } = require('@adonisjs/generic-exceptions');

/** @type {import('@adonisjs/antl/src/Antl')} */
const Antl = use('Antl');

class RoleNotAllowedException extends LogicalException {
  constructor() {
    super('', 401, 'E_ROLE_NOT_ALLOWED');
  }

  /**
   * Handle this exception by itself
   */
  handle(error, { response, locale }) {
    const { status, code } = error;
    return response.status(status).json({
      status,
      code,
      error: Antl.forLocale(locale).formatMessage('auth.noPrivileges'),
    });
  }
}

module.exports = RoleNotAllowedException;
