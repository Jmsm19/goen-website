/* eslint-disable global-require */
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { User, Clan } = require('../models');

module.exports = passport => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || 'SECRET_KEY',
    usernameField: 'email',
    passwordField: 'password',
  };

  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findOne({
        where: { email: jwtPayload.email },
        include: [Clan],
      })
        .then(user => {
          done(null, user);
        })
        .catch(error =>
          done({
            error: 'Invalid token',
            reason: 'invalid_token',
          }),
        );
    }),
  );

  passport.serializeUser((foundUser, done) => {
    done(null, foundUser.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(foundUser => {
      if (foundUser) {
        done(null, foundUser.get());
      } else {
        done(foundUser.errors, null);
      }
    });
  });
};
