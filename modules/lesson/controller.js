// Autoload all of the models
var model = require('./model');
var extend = require('extend');
var only = require('only');

var utils = require('auto-load')('app/utils');
var error = utils.error;

// Required points for authorization
var auth = utils.auth({ add: 100, edit: 50 });


function ajax(res, next){
  return function(err, lesson){
    if (err) return next(err);
    res.json(lesson);
  };
}


exports.index = function(req, res) { res.redirect('/'); };

// Retrieve a single lesson
exports.get = function(req, res, next) {
  model.get({ id: req.params.id, language: req.lang } , function(err, lesson) {
    if (err) return next(err);
    var link = { link: '/subject/' + lesson.subject.id };
    lesson.subject = extend(lesson.subject, link);
    res.render('lesson/get', lesson);
  });
};

// Add a subject
exports.add = function(req, res, next) {
  if (!auth.add(req.user)) return next(error('hack', 400, true));
  var data = extend(req.body, { user: req.user._id, language: req.lang });
  model.add(data, ajax(res, next));
};


// Update the information from the preview
exports.update = function(req, res, next) {
  console.log("UPDATING");
  if (!auth.edit(req.user)) return next(error('hack', 400, true));
  var data = extend(req.body, { id: req.params.id, user: req.user._id });
  if (!data.title) next(new Error('Nothing valid to update'));
  
  model.update(data, ajax(res, next));
};

exports.save = function(req, res, next) {
  
  if (!auth.edit(req.user)) return next(error('hack', 400, true));
  var data = extend(req.body, { id: req.params.id, user: req.user._id });
  if (!data.content) next(new Error('Nothing valid to update'));
  
  model.save(data, ajax(res, next));
};
