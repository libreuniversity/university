var only = require('only');
var extend = require('extend');

var app = require('auto-load')('app');
var model = require('./schema').subject;
var ops = app.utils.dbops;

// Retrieve all of the elements
module.exports.index = function(arg, data, callback){
  callback = ops.append(data, callback, 'subject');
  model.find({ language: data.language }, callback);
};

// Retrieve a single element from the database
module.exports.get = function(id, data, callback){
  var filter = { _id: id, language: data.language };
  callback = ops.append(data, callback, 'subject');
  model.findOne(filter).populate('lessons').exec(callback);
};

// Add a new subject to the database
module.exports.add = function(param, data, callback){
  var article = new model(only(data, 'title summary language'));
  article.save(function(err) {
    callback(err, extend(data, { subject: article }));
  });
};

// Update a single record
module.exports.edit = function(id, data, callback){
  if (!id) return callback(new Error("Id is required"));
  if (!data.title) return callback(new Error("Title is required"));
  if (!data.summary) return callback(new Error("Summary is required"));
  data = only(data, 'title summary');
  model.findByIdAndUpdate(id, { $set: data }, { new: true }, callback);
};

// Add a lesson to a subject
module.exports.addLesson = function(subjectId, data, callback){
  var push = { $push: { lessons: data.lesson._id }};
  model.findByIdAndUpdate(subjectId, push, { new: true }, ops.append(data, callback, 'subject'));
};

// Retrieve a subject by lesson
module.exports.byLesson = function(lessonId, data, callback){
  if (!lessonId) return callback(new Error('Lesson not found'));
  callback = ops.append(data, callback, 'subject', true);
  model.findOne({ lessons: lessonId }, callback);
};

module.exports.needed = function(id, data, callback){
  model.findOne({ _id: id }, function(err, subject){
    if (!subject) return callback(new Error("No subject available"));
    callback(err, data);
  });
};
