// Require them from a string
var npm = {};
npm.express = require('express');
npm.serveFavicon = require('serve-favicon');
npm.notrailing = require('notrailing');
npm.compression = require('compression');
npm.mongoose = require('mongoose');
npm.bodyParser = require('body-parser');
npm.expressSubdomain = require('express-subdomain');
npm.autoLoad = require('auto-load');

// Middleware
var middle = npm.autoLoad('middle');

npm.mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost', function(err){
  if (err) console.error.bind(console, 'connection error:');
  
  var app = npm.express();
  
  // view engine setup
  app.set('views', __dirname + '/modules');
  app.set('view engine', 'jade');
  
  app.use(npm.serveFavicon(__dirname + '/public/images/logo.png'));
  app.use(npm.bodyParser.json());
  app.use(npm.bodyParser.urlencoded({ extended: false }));
  app.use(npm.compression());
  app.use(npm.express.static('public', { maxAge: 86400000 }));
  
  // Avoid urls that finish with '/'
  app.use(middle.cleanurl({ trustheader: true, https: false }));
  app.use(npm.notrailing);
  
  // Localization
  app.use("/", middle.detectLanguage);
  
  
  app.use(middle.createSession(npm.mongoose));
  
  // Load the user auth stuff
  var passport = require('./modules/user/passport');
  var usermodel = require('./modules/user/model');
  passport(app, usermodel);
  
  // Use the routes in /routes.js
  var home = npm.express.Router();
  //var router = require('./app/router');
  var router = require('auto-load')('app').router;
  home.get('*', function(req, res){ res.render('home/info'); });
  app.use(npm.expressSubdomain('es', router));
  app.use(npm.expressSubdomain('en', router));
  app.use(npm.expressSubdomain('www', home));
  app.use(home);
  
  // Error handling
  app.use(middle.errorHandler);
  
  // Port 3000 for dev and default for the remote, heroku uses a transparent tls
  app.listen(process.env.PORT || 3000);
});

