// Middleware
var app = require('auto-load')('app');

app.npm.mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost', function(err){
  if (err) console.error.bind(console, 'connection error:');
  
  var server = app.npm.express();
  
  // view engine setup
  server.set('views', __dirname + '/modules');
  server.set('view engine', 'jade');
  
  server.use(app.npm.serveFavicon(__dirname + '/public/images/logo.png'));
  server.use(app.npm.bodyParser.json());
  server.use(app.npm.bodyParser.urlencoded({ extended: false }));
  server.use(app.npm.compression());
  server.use(app.npm.express.static('public', { maxAge: 86400000 }));
  
  // Avoid urls that finish with '/'
  server.use(app.middle.cleanurl({ trustheader: true, https: false }));
  server.use(app.npm.notrailing);
  
  // Localization
  server.use("/", app.middle.detectLanguage);
  
  
  server.use(app.middle.createSession(app.npm.mongoose));
  
  // Load the user auth stuff
  var passport = require('./modules/user/passport');
  var usermodel = require('./modules/user/model');
  passport(server, usermodel);
  
  // Use the routes in /routes.js
  var home = app.npm.express.Router();
  home.get('*', function(req, res){ res.render('home/info'); });
  server.use(app.npm.expressSubdomain('es', app.router));
  server.use(app.npm.expressSubdomain('en', app.router));
  server.use(app.npm.expressSubdomain('www', home));
  server.use(home);
  
  // Error handling
  server.use(app.middle.errorHandler);
  
  // Port 3000 for dev and default for the remote, heroku uses a transparent tls
  server.listen(process.env.PORT || 3000);
});

