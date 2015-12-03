var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var domains = ['local.com', 'libre.university'];

module.exports = function(mongoose){

  return function(req, res, next){

    var domain = domains.find(function(dom){
      return req.header('host').match(dom);
    });
    session({
      secret: 'anything',
      saveUninitialized: true,
      resave: true,
      store: new MongoStore({ db:mongoose.connection.db }),
      cookie: { domain: domain ? '.' + domain : false }
    })(req, res, next);
  };
};
