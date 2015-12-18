// Autoload all of the models
var model = require('./model');
var app = require('auto-load')('app');
var pipe = require('water-pipe');
var extend = require('extend');
var config = app.config;
var api = app.api;
var answer = app.utils.answer;

// Retrieve all of the lessons available and display them
exports.index = function(req, res, next) {
  pipe({ language: req.lang })
    .pipe(model.index)
    .end(answer.view(res, next, 'subject/index'));
};

// Show a single element
exports.get = function(req, res, next) {
  pipe({ language: req.lang })
    .pipe(model.get, req.params.id)
    .end(answer.view(res, next, 'subject/get'));
};

// Add a subject
exports.add = function(req, res, next) {
  pipe(req.body, { user: req.user, language: req.lang })
    .pipe(api.user.auth, config.subject.auth.add)
    .pipe(model.add)
    .end(answer.ajax(res, next));
};

// Update the information for the subject
exports.edit = function(req, res, next) {
  pipe(req.body, { user: req.user })
    .pipe(api.user.auth, config.subject.auth.edit)
    .pipe(model.edit, req.params.id)
    .end(answer.ajax(res, next));
};

