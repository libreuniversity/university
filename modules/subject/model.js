var mongoose = require('mongoose');
var shortid = require('shortid');
var lessonSchema = require('../lesson/model');
var encode = encodeURIComponent;

var data = {
  id: { type: String, unique: true, default: shortid.generate },
  title: { type: String, required: true, validate: /.+/ },
  summary: { type: String, required: true },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  added: { type: Date, default: Date.now }
};

var model = mongoose.model('Subject', mongoose.Schema(data));

// Retrieve all of the elements
module.exports.index = function(callback){
  model.find(callback);
};

// Retrieve a single element from the database
module.exports.get = function(id, callback){
  model.findOne({ id: encode(id) }).populate('lessons').exec(function(err, subject){
    if (!subject) err = new Error("No record found");
    callback(err, subject);
  });
};

// Add a new subject to the database
module.exports.add = function(content, callback){

  var article = new model(content);
  article.save(function(err) {
    callback(err, article);
  });
};

// Update a single record
module.exports.edit = function(id, change, callback){
  if (!id) return callback(new Error("Id is required"));
  if (!change.title) return callback(new Error("Title is required"));
  if (!change.summary) return callback(new Error("Summary is required"));
  model.update({ id: encode(id) }, { $set: change }, callback);
};

module.exports.addLesson = function(id, lesson, callback){
  var push = { $push: { lessons: lesson }};
  model.findByIdAndUpdate(id, push, function(err, subject){
    if (err) return callback(err);
    callback(null, subject);
  });
};


// For other access
module.exports.mongo = function(){
  return model;
};



