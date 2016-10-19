var model = require('./model');
var passport = require('passport');

module.exports.get = function(req, res){
  if (!req.user) return res.redirect('/');
  res.render('user/one');
};

module.exports.login = function(req, res, next){
  console.log("User:", req.user);
  res.redirect('/');
};

module.exports.logout = function(req, res){
  console.log("Logged out");
  req.logout();
  res.redirect('/');
};
