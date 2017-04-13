const model = require('./model');
const upload = require('./upload');
const { handle, npm, api } = require('auto-load')('app');
const { moment } = npm;

// Cannot retrieve a list of lessons without context
exports.index = ctx => ctx.res.redirect('/');

// Retrieve a single item
exports.get = async ctx => {
  let lesson = await model.get(ctx.req.params.id);
  console.log(lesson);
  lesson = await api.subject.byLesson(lesson);
  console.log(lesson);
  ctx.res.render('lesson/get', { lesson });
};

// Save the edited lesson content
exports.save = handle(req => model.save({
  id: req.params.id,
  user: req.user.id,
  content: req.body.content
})).auth().use(model.archive).json();

// Upload an image
exports.upload = handle(req => upload(req.files.upload)).auth().json(data => ({
  uploaded: 1,
  fileName: data.name,
  url: data.url.replace('http://', 'https://')
}));

exports.records = handle(model.records, 'records')
  .use(require('./bundle-records'))
  .render('lesson/records');

exports.history = handle(model.history, 'lesson').use(lesson => {
  let timestamp = { timestamp: moment(lesson.timestamp).fromNow() };
  return Object.assign({}, lesson, timestamp);
}).render('lesson/history');





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
    .pipe(api.user.auth, 0)
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
