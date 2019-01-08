const jwt = require('jsonwebtoken');
const bCrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');
const uuid = require('uuid/v4');
const sequelize = require('sequelize');
const { User, Role } = require('../models');

const smtpTransport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

function generateHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
}

module.exports = {
  signup(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then(foundUser => {
      if (foundUser) {
        return res.status(400).send({
          error: 'Email already taken',
        });
      }

      const { password } = req.body;
      const activationToken = uuid();

      const data = {
        ...req.body,
        activationToken,
        password: generateHash(password),
      };

      // CREATE USER
      return User.create(data)
        .then(user => {
          Role.findOne({ where: { name: 'student' } }).then(role => {
            user.addRole(role, { through: 'RoleUser' }).then(() => {
              const url = `${process.env.FRONTEND_URL}/verify?tk=${activationToken}`;
              const mailOptions = {
                to: data.email,
                subject: 'Please confirm your Email account',
                html: `Hello,<br> Please Click on the link to verify your email.<br><a href=${url}>Click here to verify</a>`,
              };

              smtpTransport.sendMail(mailOptions, (error, response) => {
                if (error) {
                  User.destroy({
                    where: { email: user.email },
                  }).then(() => {
                    res.status(500).json({
                      error: 'Something happened, user could not be created',
                      reason: 'mailing_error',
                    });
                  });
                } else {
                  // eslint-disable-next-line no-console
                  console.log(`Message sent to ${data.email}`);
                  res.status(201).json({
                    message: 'User created! Please check your email',
                    reason: 'user_created',
                  });
                }
              });
            });
          });
        })
        .catch(({ errors }) =>
          res.status(400).json({
            error: errors.map(error => ({
              field: error.path,
              reason: error.validatorKey,
              message: error.message,
            })),
          }),
        );
    });
  },
  login(req, res) {
    const { email, password, rememberMe } = req.body;
    User.findOne({
      where: { email },
    })
      .then(user => {
        // Compare password with hash
        if (bCrypt.compareSync(password, user.password)) {
          const secret = process.env.SECRET_KEY || 'SECRET_KEY';
          const opts = {
            expiresIn: rememberMe ? 60480 : 43200, // 1 week or 12 hours
          };
          const token = jwt.sign({ email }, secret, opts);
          return res.status(200).json({
            token,
            tokenType: 'Bearer',
            expiresIn: opts.expiresIn,
          });
        }
        // Wrong password
        return res.status().json({
          message: 'Wrong password',
          reason: 'password_error',
        });
      })
      .catch(error =>
        res.status(401).json({
          message: 'Auth Failed',
          reason: 'user_not_found',
        }),
      );
  },
  logout(req, res) {
    req.logOut();
    return res.status(200).json({
      message: 'You have successfuly logged out',
    });
  },
  user(req, res) {
    const { user } = req;
    return res.status(200).json({
      data: {
        id: user.id,
        name: user.name,
        nationalId: user.nationalId,
        email: user.email,
        phoneNumber: user.phoneNumber,
        birthDate: user.birthDate,
        clan: user.Clan ? user.Clan.name : null,
      },
    });
  },
  verifyEmail(req, res) {
    const { tk } = req.query;
    User.update(
      {
        active: true,
        activationToken: null,
        emailVerifiedAt: sequelize.fn('NOW'),
      },
      { where: { activationToken: tk } },
    )
      .then(updatedRows => {
        // If no rows are updated, no User was found
        if (!updatedRows[0] > 0) {
          throw Error();
        }
        res.status(200).json({
          message: 'Email verified',
          reason: 'email_verified',
        });
      })
      .catch(error =>
        res.status(400).json({
          error: 'Invalid activation token',
          reason: 'invalid_token',
        }),
      );
  },
};
