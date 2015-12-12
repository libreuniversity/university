// Autoload all of the models
var model = require('./model');
var only = require('only');
var extend = require('extend');
var utils = require('auto-load')('app/utils');

// Editable fields
var fields = ['title', 'summary'];

// Required points for authorization
var auth = utils.auth({ add: 1000, edit: 500 });

// Retrieve all of the lessons available and display them
exports.index = function(req, res, next) {
  model.index({ language: req.lang }, function(err, subjects) {
    if (err) return next(err);
    res.render('subject/index', { list: subjects });
  });
};

// Show a single element
exports.get = function(req, res, next) {
  model.get({ id: req.params.id, language: req.lang }, function(err, subject){
    if (err) return next(err);
    res.render('subject/subject', subject);
  });
};

// Add a subject
exports.add = function(req, res, next) {
  if (!auth.add(req.user)) return res.json({ error: "Not authorized" });
  var data = extend(req.body, { user: req.user._id, language: req.lang });
  model.add(data, function(err, subject){
    res.json({ error: err, subject: subject });
  });
};

// Update the information
exports.edit = function(req, res, next) {
  if (!auth.edit(req.user)) return res.json({ error: "Not authorized" });
  model.edit(req.params.id, only(req.body, fields), function(err){
    res.json({ error: err });
  });
};
