// Load everything, including dependencies
require('dotenv').config({silent: true});
var app = require('auto-load')('app');

var server = app.npm.express();
server.set('views', __dirname + '/modules');
server.set('view engine', 'jade');
server.use(app.npm.serveFavicon(__dirname + '/public/images/logo.png'));
server.use(app.npm.bodyParser.json());
server.use(app.npm.bodyParser.urlencoded({ extended: false }));
server.use(app.npm.compression());
server.use(app.npm.express.static('public', { maxAge: 86400000 }));
server.use(app.npm.cookieParser('foo'));
var redis = app.npm.connectRedis(app.npm.expressSession);
server.use(app.npm.expressSession({
  store: new redis(process.env.REDIS_URL ? { url: process.env.REDIS_URL } : {}),
  secret: 'dfbdfilsjpergnsjkdafnweofnwevre',
  resave: true,
  saveUninitialized: false
}));

app.npm.mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost', function(err){
  if (err) console.error.bind(console, 'connection error:');

  // Avoid urls that finish with '/'
  // The "https: false" is because we're using cloudfare for https
  // server.use(app.middle.cleanurl({ https: false }));
  // server.use(app.npm.notrailing);

  server.locals.env = process.env;

  var passport = require('./modules/user/passport');
  server.use(passport.initialize());
  server.use(passport.session());

  server.use(function(req, res, next){
    if (req.session && req.query.returnTo) req.session.returnTo = req.query.returnTo;
    res.locals.user = req.user;
    next();
  });

  // Localization
  server.use("/", app.middle.local('app/localization', { allow: ['en', 'es'] }));

  // server.use(app.middle.createSession(app.npm.mongoose));

  server.use(function (req, res, next) {
    if (!req.session) {
      return next(new Error('No session')); // handle error
    } else {
      console.log("Session:", req.session, req.user);
    }
    next(); // otherwise continue
  });

  // Use the routes in /routes.js
  var home = app.npm.express.Router();
  home.get('*', function(req, res){ res.render('home/info'); });
  server.use(app.npm.expressSubdomain('es', app.router()));
  server.use(app.npm.expressSubdomain('en', app.router()));
  server.use(app.npm.expressSubdomain('www', home));
  server.use(home);

  // Error handling
  server.use(app.middle.errorHandler);

  // Port 3000 for dev and default for the remote, heroku uses a transparent tls
  server.listen(process.env.PORT || 3000);
});
