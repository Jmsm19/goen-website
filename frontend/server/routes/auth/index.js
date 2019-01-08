const express = require('express');

const router = express.Router();

const AuthController = require('../../controllers/AuthController');
const AuthPolicies = require('../../policies/AuthPolicies');

module.exports = passport => {
  router.get('/signup/verify', AuthController.verifyEmail);
  router.post('/signup', AuthPolicies.signup, AuthController.signup);
  router.post('/login', AuthPolicies.login, AuthController.login);
  router.get('/logout', passport.authenticate('jwt', { session: false }), AuthController.logout);
  router.get('/user', passport.authenticate('jwt', { session: false }), AuthController.user);

  return router;
};
