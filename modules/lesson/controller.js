const model = require('./model');
const { handle, npm, api } = require('auto-load')('app');
const { cloudinary } = npm;

exports.index = (req, res) => res.redirect('/');

exports.get = handle(model.get, 'lesson')
  .use(api.subject.byLesson)
  .render('lesson/get');


exports.upload = (req, res) => {
  cloudinary.config({
    cloud_name: process.env.cloud,
    api_key: process.env.key,
    api_secret: process.env.secret
  });
  cloudinary.uploader.upload(req.files.upload.path, result => res.json({
    uploaded: 1,
    fileName: req.files.upload.name,
    url: result.url.replace('http://', 'https://')
  }));
}







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

exports.save = function(req, res, next) {
  pipe({ lesson: req.body, user: req.user, language: req.lang, subject: req.body.subject })
    .pipe(api.user.auth, config.auth.save)
    .pipe(model.save, req.params.id)
    .end(answer.ajax(res, next));
};
