var mongoose = require('mongoose');
var shortid = require('shortid');
var only = require('only');
var extend = require('extend');
var lessonSchema = require('../lesson/model');
var ops = require('auto-load')('app/utils').dbops;
var encode = encodeURIComponent;

var data = {
  _id: { type: String, unique: true, default: shortid.generate },
  title: { type: String, required: true, validate: /.+/ },
  summary: { type: String, required: true },
  lessons: [{ type: String, ref: 'Lesson' }],
  language: { type: String, required: true, validate: /(es|en)/ },
  added: { type: Date, default: Date.now }
};

var subjectSchema = mongoose.Schema(data);
subjectSchema.virtual('id').get(function(){ return this._id; });
subjectSchema.virtual('link').get(function(){ return '/subject/' + this._id; });
var model = mongoose.model('Subject', subjectSchema);

// Retrieve all of the elements
module.exports.index = function(subject, callback){
  model.find({ language: subject.language }, callback);
};

// Retrieve a single element from the database
module.exports.get = function(subject, callback){
  var filter = { _id: subject.id, language: subject.language };
  model.findOne(filter).populate('lessons').exec(function(err, subject){
    if (!subject) return callback(new Error("No subject found"));
    callback(err, subject);
  });
};

// Add a new subject to the database
module.exports.add = function(content, callback){
  var article = new model(only(content, 'title summary language'));
  article.save(function(err) {
    callback(err, article);
  });
};

// Update a single record
module.exports.edit = function(id, change, callback){
  if (!id) return callback(new Error("Id is required"));
  if (!change.title) return callback(new Error("Title is required"));
  if (!change.summary) return callback(new Error("Summary is required"));
  model.findByIdAndUpdate(id, { $set: change }, { new: true }, callback);
};

module.exports.addLesson = function(id, lesson, callback){
  var push = { $push: { lessons: lesson }};
  model.findByIdAndUpdate(id, push, { new: true }, function(err, subject){
    if (err) return callback(err);
    callback(null, subject);
  });
};


// Retrieve a subject by lesson
module.exports.byLesson = function(lessonId, data, callback){
  if (!lessonId) return callback(new Error('Lesson not found'));
  callback = ops.append(data, callback, 'subject', true);
  model.findOne({ lessons: lessonId }, callback);
};


// For other access
module.exports.mongo = function(){
  return model;
};



