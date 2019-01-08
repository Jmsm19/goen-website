/* eslint-disable global-require */
/* eslint-disable no-console */
const express = require('express');
const next = require('next');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const config = require('./config');

const port = parseInt(process.env.PORT, 10) || config.port;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(morgan('combined'));
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use(cors());

    // Passport
    server.use(
      // session secret
      session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
      }),
    );
    server.use(passport.initialize());
    // persistent login sessions
    server.use(passport.session());
    // Passport middleware
    require('./config/passport.js')(passport);

    // Routes
    require('./routes')(server, passport);

    // Next.js handles any other route
    server.get('*', (req, res) => {
      handle(req, res);
    });

    // Sync with database
    server.listen(3000, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
