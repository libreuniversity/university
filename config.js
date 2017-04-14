const session = require('express-session');
const redis = require('connect-redis')(session);
const store = new redis(process.env.REDIS_URL ? { url: process.env.REDIS_URL } : {});

module.exports = {
  views: __dirname + '/modules',
  languages: ['en', 'es'],
  connect: {
    csrf: false,  // Temporary; first migrate, then secure
    session: {
      store: store,
      secret: 'dfbdfilsjpergnsjkdafnweofnwevre',
      resave: true,
      saveUninitialized: false,
      cookie: { domain: '.' + process.env.DOMAIN, path: '/', httpOnly: true, secure: false, maxAge: null }
    }
  },
  parser: {
    cookies: 'dfbdfilsjpergnsjkdafnweofnwevre'
  }
};
