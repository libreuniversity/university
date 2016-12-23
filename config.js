let session = require('express-session');
let redis = require('connect-redis')(session);
let store = new redis(process.env.REDIS_URL ? { url: process.env.REDIS_URL } : {});


module.exports = {
  views: __dirname + '/modules',
  languages: ['en', 'es'],
  middle: {
    session: {
      store: store,
      secret: 'dfbdfilsjpergnsjkdafnweofnwevre',
      resave: true,
      saveUninitialized: false,
    },
    cookies: 'dfbdfilsjpergnsjkdafnweofnwevre'
  }
};
