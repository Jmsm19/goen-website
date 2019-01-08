/* eslint-disable global-require */
module.exports = (server, passport) => {
  server.use('/api', require('./api')(passport));
  server.use('/api/auth', require('./auth')(passport));
};
