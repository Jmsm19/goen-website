/** @typedef {import('@adonisjs/mail/src/Mail/Message')} Message */
/** @typedef {import('../Models/User')} UserInstance */

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

/** @type {import('@adonisjs/mail/src/Mail')} */
const Mail = use('Mail');

/** @type {import('@adonisjs/antl/src/Antl')} */
const Antl = use('Antl');

// eslint-disable-next-line no-multi-assign
const User = (exports = module.exports = {});

/**
 * Sends email with token to verify email address
 *
 * @param {UserInstance} user
 */
User.registered = async ({ user, locale }) => {
  await Mail.send('mails.user.new', user, message => {
    const mailTitle = Antl.forLocale(locale).formatMessage('mails.userRegisteredSubject');
    message.to(user.email);
    message.from(Env.get('MAIL_FROM_ADDRESS'));
    message.subject(mailTitle);
  });
};

/**
 * Sends email on successful email confirmation
 *
 * @param {UserInstance} user
 */
User.verified = async ({ user, locale }) => {
  await Mail.send('mails.user.verified', user, message => {
    const mailTitle = Antl.forLocale(locale).formatMessage('mails.emailVerifiedSubject');
    message.to(user.email);
    message.from(Env.get('MAIL_FROM_ADDRESS'));
    message.subject(mailTitle);
  });
};
