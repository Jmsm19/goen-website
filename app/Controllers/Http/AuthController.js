/* eslint-disable class-methods-use-this */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('adonis-bumblebee/src/Bumblebee')} Bumblebee */
/** @typedef {import('../../Models/User')} User */

/** @type {import('@adonisjs/antl/src/Antl')} */
const { forLocale } = use('Antl');

/** @type {import('@adonisjs/framework/src/Event')} */
const Event = use('Event');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

/** @type {import('../../Models/User')} */
const User = use('App/Models/User');

/** @type {import('../../Models/Setting')} */
const Setting = use('App/Models/Setting');

const { getRole } = require('../../Utils');

class AuthController {
  /**
   * Registers user and sends token to verify email
   * GET auth/signup
   *
   * @param {object} ctx
   * @param {object} ctx.auth
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {String} ctx.locale
   * @memberof AuthController
   */
  async signup({ auth, request, response, locale }) {
    const requestUser = auth.user;
    let isAdmin = false;
    if (requestUser) {
      isAdmin = requestUser.hasRole('admin');
    }

    const setting = await Setting.firstOrFail();
    const userSignupActive = setting.toJSON().user_signup_active;
    if (userSignupActive || isAdmin) {
      const { body } = request;
      const activationToken = await Hash.make(body.email);

      const user = await User.create({
        name: body.name,
        email: body.email,
        national_id: body.nationalId,
        password: body.password,
        birth_date: body.birthDate,
        phone_number: body.phoneNumber,
        activation_token: activationToken,
      });

      const { roleName } = request.all();
      if (isAdmin && roleName) {
        // Attach specific role
        const role = await getRole(roleName);
        await user.roles().attach([role.id]);
      } else {
        // Attach student role
        const role = await getRole('student');
        await user.roles().attach([role.id]);
      }

      Event.fire('new::user', { user: user.toJSON(), locale });

      return response.status(201).json({
        message: forLocale(locale).formatMessage('auth.successfulSignup'),
      });
    }

    return response.status(401).json({
      error: forLocale(locale).formatMessage('auth.signupForbidden'),
    });
  }

  /**
   * Gets user by activation_token and marks mail address as verified
   * GET auth/activate
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {String} ctx.locale
   * @param {Bumblebee} ctx.transform
   * @memberof AuthController
   */
  async activateSignup({ request, response, locale, transform }) {
    const { token } = request.all();
    const user = await User.query()
      .where('activation_token', token)
      .first();

    if (!user) {
      return response.status(400).json({
        error: forLocale(locale).formatMessage('auth.invalidActivationToken'),
      });
    }

    user.active = true;
    user.email_verified_at = new Date();
    user.activation_token = '';
    await user.save();

    Event.fire('verified::user', { user: user.toJSON(), locale });

    return transform.item(user, 'UserTransformer.withExtra');
  }

  /**
   * Checks credentials and generates a jwt token to authenticate user
   * GET auth/login
   *
   * @param {object} ctx
   * @param {object} ctx.auth
   * @param {Request} ctx.request
   * @param {Bumblebee} ctx.transform
   * @memberof AuthController
   */
  async login({ auth, request, transform }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);

    return transform.item(token, 'TokenTransformer');
  }

  /**
   * Revokes API token for the authenticated user
   * POST auth/logout
   *
   * @param {object} ctx
   * @param {object} ctx.auth
   * @param {Response} ctx.response
   * @param {String} ctx.locale
   * @memberof AuthController
   */
  async logout({ auth, response, locale }) {
    const apiToken = auth.getAuthHeader();
    await auth.authenticator('api').revokeTokens([apiToken], true);

    return response.status(201).json({
      message: forLocale(locale).formatMessage('auth.logout'),
    });
  }

  /**
   * Returns the currently logged in user instance
   * GET auth/user
   *
   * @param {object} ctx
   * @param {object} ctx.auth
   * @param {function} ctx.auth.getUser
   * @param {Bumblebee} ctx.transform
   * @memberof AuthController
   */
  async getUser({ auth, transform }) {
    const loggedInUser = await auth.getUser();

    const instructorIncludes = (await loggedInUser.isInstructor())
      ? ['modulesAsInstructor.schedule', 'modulesAsInstructor.period', 'modulesAsInstructor.clan']
      : [];

    return transform
      .include([...instructorIncludes])
      .item(loggedInUser, 'UserTransformer.withExtra');
  }
}

module.exports = AuthController;
