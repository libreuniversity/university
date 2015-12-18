var app = require('auto-load')('app');
var only = require('only');
var extend = require('extend');
var pipe = require('water-pipe');
var config = app.config.lesson;
var api = app.api();
var utils = app.utils;
var error = utils.error;
var model = require('./model');
var answer = app.utils.answer;


exports.index = function(req, res) { res.redirect('/'); };

exports.get = function(req, res, next){
  pipe({ language: req.lang })
    .pipe(model.get, req.params.id)
    .pipe(api.subject.byLesson, req.params.id)
    .end(utils.answer.view(res, next, 'lesson/get'));
};

exports.add = function(req, res, next) {
  pipe({ lesson: req.body, user: req.user, language: req.lang, subject: req.body.subject })
    .pipe(api.user.auth, config.auth.add)
    .pipe(model.add)
    .end(answer.ajax(res, next));
};


// Update the information from the preview
exports.update = function(req, res, next) {
  pipe({ lesson: req.body, user: req.user, language: req.lang, subject: req.body.subject })
    .pipe(api.user.auth, config.auth.update)
    .pipe(model.update, req.params.id)
    .end(answer.ajax(res, next));
};

exports.save = function(req, res, next) {
  pipe({ lesson: req.body, user: req.user, language: req.lang, subject: req.body.subject })
    .pipe(api.user.auth, config.auth.save)
    .pipe(model.save, req.params.id)
    .end(answer.ajax(res, next));
};
