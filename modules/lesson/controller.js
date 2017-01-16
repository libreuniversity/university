const model = require('./model');
const upload = require('./upload');
const { handle, npm, api } = require('auto-load')('app');

// Cannot retrieve a list of lessons without context
exports.index = (req, res) => res.redirect('/');

// Retrieve a single item
exports.get = handle(model.get, 'lesson')
  .use(api.subject.byLesson)
  .render('lesson/get');

// Save the edited lesson content
exports.save = handle(req => model.save({
  id: req.params.id,
  user: req.user.id,
  content: decodeURIComponent(req.body.content)
})).use(model.archive).auth(10).json();

// Upload an image
exports.upload = handle(req => upload(req.files.upload)).json(data => ({
  uploaded: 1,
  fileName: data.name,
  url: data.url.replace('http://', 'https://')
}));







// Legacy:
var app = require('auto-load')('app');
var only = require('only');
var extend = require('extend');
var pipe = require('water-pipe');
var config = app.config.lesson;
var utils = app.utils;
var error = utils.error;
var answer = app.utils.answer;



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
