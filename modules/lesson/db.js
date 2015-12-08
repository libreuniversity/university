var only = require('only');
var extend = require('extend');
var mongoose = require('mongoose');

var data = require('./data');
var sanitize = require('./sanitize');
var subject = require('../subject/model');


var lessonSchema = mongoose.Schema(data.lesson);
lessonSchema.virtual('html').get(function(){
  return sanitize(this.content);
});
lessonSchema.virtual('id').get(function(){ return this._id; });
var model = mongoose.model('Lesson', lessonSchema);

// History lesson
var historySchema = mongoose.Schema(data.history);
historySchema.virtual('html').get(function(){
  return sanitize(this.content);
});
var history = mongoose.model('LessonHistory', historySchema);


// Just keep passing things forward
var pass = (el, callback) => err => callback(err, el);

// Pass it forward with some extra elements from the original
var upgrade = (el, callback, parts) => function(err, next) {
  console.log(next);
  callback(err, extend(next, only(el, parts)));
};


// Database operations to use in waterfall
module.exports.findById = function(id, callback){
  if (!id) return callback(new Error('No lesson specified'));
  model.findById(id, callback);
};

module.exports.findSubject = function (lesson, callback){
  if (!lesson) return callback(new Error('Lesson not found'));
  subject.mongo().findOne({ lessons: lesson.id }, function(err, subject){
    if (!subject) return callback(new Error('No subject found'));
    callback(err, extend(lesson, { subject: subject }));
  });
};

module.exports.checkPreviewData = function(content, callback) {
  if (!content) return callback(new Error('No data submitted'));
  if (!content.subject) return callback(new Error('No subject provided'));
  callback(null, content);
};

module.exports.add = function(lesson, callback){
  var article = new model(only(lesson, 'title summary'));
  article.save(pass(extend(article, only(lesson, 'user subject')), callback));
};

module.exports.addToHistory = function(lesson, callback){
  var article = new history(only(lesson, 'id user title summary content'));
  article.save(pass(lesson, callback));
};

module.exports.addToSubject = function(lesson, callback) {
  subject.addLesson(lesson.subject, lesson.id, pass(lesson, callback));
};

module.exports.update = function(lesson, callback){
  callback = upgrade(lesson, callback, 'user subject');
  model.findByIdAndUpdate(lesson.id, only(lesson, 'title summary'), { new: true }, callback);
};

module.exports.save = function(lesson, callback){
  callback = upgrade(lesson, callback, 'user subject');
  model.findByIdAndUpdate(lesson.id, only(lesson, 'content'), { new: true }, callback);
};

