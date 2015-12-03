var translations = require('auto-load')('static/localization');

// Detect the current language
module.exports = function(req, res, next) {
  var sub = req.header("host").split('.').shift();
  req.lang = (['es', 'en'].indexOf(sub) !== -1) ? sub : 'en';
  res.locals.text = translations[req.lang];
  next();
};