var only = require('only');
var extend = require('extend');
var crypto = require('crypto');

// Autoload all of the models
var model = require('./model');
var app = require('auto-load')('app');
var api = app.api();
var answer = app.utils.answer;
var pipe = require('water-pipe');

// Display all of the questions of a lesson
exports.index = function(req, res, next) {
  
  pipe({})
    .pipe(api.lesson.get, req.params.id)
    .pipe(api.subject.byLesson, req.params.id)
    .pipe(model.get, req.params.id)
    .pipe(model.choose, req.params.id)
    .end(answer.view(res, next, 'test/index'));
};


// Add a test
exports.add = function(req, res, next) {
  //if (!auth.add(req.user)) return next(error('hack', 400, true));
  var data = extend(req.body, { user: req.user._id, language: req.lang });
  model.add(data, answer.ajax(res, next));
};


// Save the test question/answer in the database




exports.update = function(req, res) {};
