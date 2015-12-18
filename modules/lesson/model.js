var asyn = require('async');
var db = require('./db');
var only = require('only');
var extend = require('extend');
var app = require('auto-load')('app');
var ops = app.utils.dbops;
var pipe = require('water-pipe');
var api = app.api;

var mongo = require('./schema');


// Retrieve a single element by its id
module.exports.get = function(id, data, callback){
  
  // Lean makes it behave as a normal object and not a collection
  mongo.lesson.findOne({ _id: id }, ops.lean(callback));
};

// Add a new lesson to the database
module.exports.add = function(param, data, callback){
  pipe(data)
    .pipe(module.exports.checkPreviewData)
    .pipe(api.subject.needed, data.subject)
    .pipe(function(arg, data, callback){
      data.lesson.language = data.language;
      var article = new mongo.lesson(only(data.lesson, 'title summary language'));
      article.save(ops.pass(extend(data, { lesson: article }), callback));
    })
    .pipe(api.subject.addLesson, data.subject)
    .pipe(module.exports.addToHistory)
    .end(callback);
};

// Updates the preview
module.exports.update = function(content, callback){
  asyn.waterfall([
    db.init(content, asyn),
    db.update,
    db.addToHistory
  ], callback);
};

// Updates the content
module.exports.save = function(content, callback){
  asyn.waterfall([
    db.init(content, asyn),
    db.save,
    //db.addToHistory
  ], callback);
};

module.exports.addToHistory = function(arg, data, callback){
  var lesson = extend(data.lesson, { user: data.user._id, lesson: data.lesson.id });
  var fields = 'lesson user title language summary content';
  var article = new mongo.history(only(lesson, fields));
  article.save(ops.pass(lesson, callback));
};

module.exports.checkPreviewData = function(arg, data, callback) {
  if (!data) return callback(new Error('No data submitted'));
  if (!data.subject) return callback(new Error('No subject provided'));
  if (!data.language) return callback(new Error('No language provided'));
  callback(null, data);
};
