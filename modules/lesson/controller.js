var app = require('auto-load')('app');
var only = require('only');
var extend = require('extend');
var pipe = require('water-pipe');
var config = app.config.lesson;
var api = app.api;
var utils = app.utils;
var error = utils.error;
var model = require('./model');
var answer = app.utils.answer;


exports.index = function(req, res) { res.redirect('/'); };

exports.get = function(req, res, next){
  pipe({ language: req.lang })
    .pipe(model.get, req.params.id)
    .pipe(api.subject.addLesson, req.params.subject)
    .end(utils.answer.view(res, next, 'lesson/get'));
};

// Add a subject
exports.add = function(req, res, next) {
  pipe({ lesson: req.body, user: req.user, language: req.lang, subject: req.body.subject })
    .pipe(api.user.auth, config.auth.add)
    .pipe(model.add)
    .end(answer.ajax(res, next));
};


// Update the information from the preview
exports.update = function(req, res, next) {
  
  if (!auth.edit(req.user)) return next(error('hack', 400, true));
  var data = extend(req.body, { id: req.params.id, user: req.user._id });
  if (!data.title) next(new Error('Nothing valid to update'));
  
  model.update(data, utils.answer.ajax(res, next));
};

exports.save = function(req, res, next) {
  
  if (!auth.edit(req.user)) return next(error('hack', 400, true));
  var data = extend(req.body, { id: req.params.id, user: req.user._id });
  if (!data.content) next(new Error('Nothing valid to update'));
  
  model.save(data, utils.answer.ajax(res, next));
};
