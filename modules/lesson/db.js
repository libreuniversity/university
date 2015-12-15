var only = require('only');
var extend = require('extend');
var mongoose = require('mongoose');

// Some database operations
var ops = require('auto-load')('app/utils').dbops;
var mongo = require('./schema');
var subject = require('../subject/model');

// Database operations to use in waterfall
module.exports.init = function(lesson, asyn){
  return asyn.apply(function(lesson, callback){
    callback(null, lesson);
  }, lesson);
};

module.exports.findById = function(lesson, callback){
  if (!lesson.id) return callback(new Error('No lesson id specified'));
  if (!lesson.language) return callback(new Error('No language specified'));
  mongo.lesson.findOne({ _id: lesson.id, language: lesson.language }, callback);
};

module.exports.plain = function(model, callback){
  callback(null, (model && model.toObject) ? model.toObject({ getters: true }) : model);
};

module.exports.findSubject = function (lesson, callback){
  if (!lesson) return callback(new Error('Lesson not found'));
  callback = ops.append(lesson, callback, 'subject', true);
  subject.mongo().findOne({ lessons: lesson.id }, callback);
};

module.exports.findHistory = function(lesson, callback){
  if (!lesson) return callback(new Error('Lesson not found'));
  callback = ops.append(lesson, callback, 'history');
  mongo.history.find({ lesson: lesson.id }, callback);
};

module.exports.checkPreviewData = function(content, callback) {
  if (!content) return callback(new Error('No data submitted'));
  if (!content.subject) return callback(new Error('No subject provided'));
  var filter = { id: content.subject, language: content.language };
  subject.get(filter, ops.pass(content, callback));
};

module.exports.add = function(lesson, callback){
  var article = new mongo.lesson(only(lesson, 'title summary language'));
  lesson = extend(article, only(lesson, 'user subject'));
  article.save(ops.pass(lesson, callback));
};

module.exports.addToHistory = function(lesson, callback){
  var fields = 'lesson user title language summary content';
  var data = only(extend(lesson, { lesson: lesson.id }), fields);
  var article = new mongo.history(data);
  article.save(ops.pass(lesson, callback));
};

module.exports.addToSubject = function(lesson, callback) {
  subject.addLesson(lesson.subject, lesson.id, ops.pass(lesson, callback));
};

module.exports.update = function(lesson, callback){
  callback = ops.upgrade(lesson, callback, 'user subject');
  var toUpdate = only(lesson, 'title summary');
  mongo.lesson.findByIdAndUpdate(lesson.id, toUpdate, { new: true }, callback);
};

module.exports.save = function(lesson, callback){
  callback = ops.upgrade(lesson, callback, 'user subject');
  var toUpdate = only(lesson, 'content');
  mongo.lesson.findByIdAndUpdate(lesson.id, toUpdate, { new: true }, callback);
};

