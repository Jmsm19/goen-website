const express = require('express');

const router = express.Router();

module.exports = passport => {
  router.get('/', (req, res) => {
    res.send({
      greetings: 'Hello, from Express API',
    });
  });

  return router;
};
