/* eslint-disable class-methods-use-this */
/** @type {import('@adonisjs/framework/src/Exception/BaseHandler')} */
const BaseExceptionHandler = use('BaseExceptionHandler');

/** @type {import('@adonisjs/antl/src/Antl')} */
const { formatMessage, forLocale } = use('Antl');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response, locale }) {
    const { code, status } = error;

    const basicError = {
      status,
      code,
    };

    switch (code) {
      case 'E_INVALID_API_TOKEN':
        return response.status(status).json({
          ...basicError,
          error: forLocale(locale).formatMessage('auth.invalidToken'),
        });
      case 'E_VALIDATION_FAILED':
        return response.status(status).json({
          ...basicError,
          error: [...error.messages],
        });
      case 'E_USER_NOT_FOUND':
        return response.status(status).json({
          ...basicError,
          error: forLocale(locale).formatMessage('auth.userNotFound', {
            email: request.all().email,
          }),
        });
      default:
        return super.handle(...arguments);
    }
  }

  // /**
  //  * Report exception for logging or debugging.
  //  *
  //  * @method report
  //  *
  //  * @param  {Object} error
  //  * @param  {Object} options.request
  //  *
  //  * @return {void}
  //  */
  // async report(error, { request }) {}
}

module.exports = ExceptionHandler;
