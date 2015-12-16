// Autoload all of the models
var model = require('./model');
var only = require('only');
var extend = require('extend');

var app = require('auto-load')('app');
var utils = app.utils;
var pipe = utils.pipe;
var error = utils.error;

// Dependencies... sort of
var api = extend({ subject: true }, app.loader('api.js'));

// Required points for authorization
var auth = utils.auth({ add: 100, edit: 50 });


exports.index = function(req, res) { res.redirect('/'); };

exports.get = function(req, res, next){
  pipe( model.byId, req.params.id )
    .pipe( api.subject.byLesson || false, req.params.id )
    .end( utils.answer.view(res, next, 'lesson/get') );
};



// Add a subject
exports.add = function(req, res, next) {
  if (!auth.add(req.user)) return next(error('hack', 400, true));
  
  var data = extend(req.body, { user: req.user._id, language: req.lang });
  
  pipe(model.add, data).end(utils.answer.ajax(res, next));
  
  // var data = extend(req.body, { user: req.user._id, language: req.lang });
  // model.add(data, utils.answer.ajax(res, next));
};


// Update the information from the preview
exports.update = function(req, res, next) {
  console.log("UPDATING");
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
