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

/** @type {typeof import('../../Models/Admin')} */
const Admin = use('App/Models/Admin');

/** @type {typeof import('../../Models/Instructor')} */
const Instructor = use('App/Models/Instructor');

/** @type {typeof import('../../Models/Assistant')} */
const Assistant = use('App/Models/Assistant');

/** @type {typeof import('../../Models/Student')} */
const Student = use('App/Models/Student');

/** @type {import('../../Models/Role')} */
const Role = use('App/Models/Role');

/** @type {import('../../Models/Setting')} */
const Setting = use('App/Models/Setting');

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

      const userData = {
        name: body.name,
        email: body.email,
        national_id: body.nationalId,
        password: body.password,
        birth_date: body.birthDate,
        phone_number: body.phoneNumber,
        activation_token: activationToken,
      };

      let user;
      const { roleName } = request.all();
      if (isAdmin && roleName) {
        // Attach specific role
        switch (roleName) {
          case 'admin':
            user = await Admin.create(userData);
            break;
          case 'instructor':
            user = await Instructor.create(userData);
            break;
          case 'assistant':
            user = await Assistant.create(userData);
            break;
          case 'student':
          default:
            user = await Student.create(userData);
            break;
        }
      } else {
        user = await Student.create(userData);
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

    return transform.item(user, 'UserTransformer');
  }

  /**
   * Checks credentials and generates a jwt token to authenticate user
   * GET auth/login
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Bumblebee} ctx.transform
   * @memberof AuthController
   */
  async login({ auth, request, response, transform }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);

    return transform.item(token, 'TokenTransformer');
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

    return transform.item(loggedInUser, 'UserTransformer');
  }
}

module.exports = AuthController;
