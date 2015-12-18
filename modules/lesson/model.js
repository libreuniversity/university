var asyn = require('async');
var only = require('only');
var extend = require('extend');
var app = require('auto-load')('app');
var ops = app.utils.dbops;
var pipe = require('water-pipe');
var api = app.api();

var mongo = require('./schema');


// Retrieve a single element by its id
module.exports.get = function(id, data, callback){
  mongo.lesson.findOne({ _id: id }, ops.append(data, ops.lean(callback), 'lesson'));
};

// Add a new lesson to the database
module.exports.add = function(param, data, callback){
  
  pipe(data)
    .pipe(module.exports.checkPreviewData)
    .pipe(api.subject.needed, data.subject)
    .pipe(module.exports.insert)
    .pipe(api.subject.addLesson, data.subject)
    .pipe(module.exports.addToHistory)
    .end(callback);
};

module.exports.insert = function (arg, data, callback){
  data.lesson.language = data.language;
  var article = new mongo.lesson(only(data.lesson, 'title summary language'));
  article.save(ops.pass(extend(data, { lesson: article }), callback));
};

// Updates the preview
module.exports.update = function(id, data, callback){
  
  pipe(data)
    .pipe(module.exports.checkPreviewData)
    .pipe(module.exports.set, id)
  .pipe(module.exports.addToHistory)
  .end(callback);
};

module.exports.set = function(id, data, callback){
  callback = ops.append(data, callback, 'lesson', true);
  var toUpdate = only(data.lesson, 'title summary content');
  mongo.lesson.findByIdAndUpdate(id, toUpdate, { new: true }, callback);
};

// Updates the content
module.exports.save = function(id, data, callback){
  pipe(data)
    .pipe(module.exports.checkPreviewData)
    .pipe(module.exports.set, id)
  .pipe(module.exports.addToHistory)
  .end(callback);
};

module.exports.addToHistory = function(arg, data, callback){
  var lesson = extend(data.lesson, { user: data.user._id, lesson: data.lesson.id });
  var fields = 'lesson user title language summary content';
  var article = new mongo.history(only(lesson, fields));
  article.save(ops.pass(lesson, callback));
};

module.exports.findHistory = function(lesson, callback){
  if (!lesson) return callback(new Error('Lesson not found'));
  callback = ops.append(lesson, callback, 'history');
  mongo.history.find({ lesson: lesson.id }, callback);
};

module.exports.checkPreviewData = function(arg, data, callback) {
  if (!data) return callback(new Error('No data submitted'));
  if (!data.language) return callback(new Error('No language provided'));
  callback(null, data);
};
