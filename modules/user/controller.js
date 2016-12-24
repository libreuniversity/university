let app = require('auto-load')('app');
var model = require('./model');
var passport = require('passport');

module.exports.get = function(req, res){
  if (!req.user) return res.redirect('/');
  res.render('user/one');
};

module.exports.login = function(req, res, next){
  // console.log("User:", req.session, req.user);
  res.redirect(req.session.returnTo || '/');
};

module.exports.logout = function(req, res){
  // console.log("Logged out");
  req.logout();
  res.redirect('/');
};

module.exports.redirect = function(req, res, next){
  var fullUrl = (process.env.HTTPS || req.protocol) + '://' + req.get('host') + '/callback';
  app.npm.passport.authenticate('auth0', {
    failureRedirect: '/error',
    failureFlash: true,
    callbackURL: fullUrl
  })(req, res, next)
};
