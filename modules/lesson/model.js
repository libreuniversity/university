var mongoose = require('mongoose');
var extend = require('extend');
var sanitize = require('sanitize-html');
var only = require('only');
var shortid = require('shortid');
var asyn = require('async');
var encode = encodeURIComponent;
var normalDate = require('../../utils/normaldate');
var subject = require('../subject/model');
var sanitizeOpt = {
  allowedTags: ['h2', 'h3', 'h4', 'br', 'p', 'b', 'i', 'a', 'ul', 'li', 'pre', 'code', 'img'],
  allowedAttributes: { 'a': ['href'], img: ['src'] }
};

var lessonData = {
  id: { type: String, unique: true, default: shortid.generate },
  title: { type: String, required: true, trim: true },
  summary: { type: String, required: true, trim: true },
  content: { type: String },
  timestamp: { type: Date, required: true, default: Date.now }
};

var lessonSchema = mongoose.Schema(lessonData);

lessonSchema.virtual('html').get(function(){
  return this.content ? sanitize(this.content, sanitizeOpt) : false;
});


// History
var historyData = extend(lessonData, { id: { type: String,  unique: false }});
var historySchema = mongoose.Schema(historyData);
var history = mongoose.model('LessonHistory', historySchema);

// Copy the lesson to the history DB
function copyToHistory(schema, id){

  // Find the current entry
  schema.findOne(id, function(err, lesson){
    
    if(lesson) {
      // We need to nullify these to be able to clone it
      lesson._id = null;
      lesson.timestamp = Date.now();
      
      // Store the lesson in the history one
      (new history(lesson)).save(function(err){
        if (err) console.log(err);
      });
    }
  });
}

// Similar to a trigger, store a copy everytime an update happens
// Hook. Read the post middleware http://mongoosejs.com/docs/middleware.html
lessonSchema.post('update', function(){
  console.log("SAVED");
  copyToHistory(this, this._conditions.id);
});





// Database operations to use in waterfall
var ops = {};

ops.findById = function(id, callback){
  if (!id) return callback(new Error('No lesson id specified'));
  model.mongo().findOne({ id: id }, callback);
};

ops.findSubject = function (lesson, callback){
  if (!lesson) return callback(new Error('Lesson not found'));
  subject.mongo().findOne({ lessons: lesson._id }, function(err, subject){
    if (err) return callback(err);
    if (!subject) return callback(new Error('No subject found'));
    callback(null, lesson, subject);
  });
};

ops.joinSubject = function(lesson, subject, callback){
  lesson = only(
    extend(lesson, { subject: subject.id }), 'id subject title summary content'
  );
  callback(null, lesson);
};

ops.checkPreviewData = function(content, callback) {
  if (!content) return callback(new Error('No data submitted'));
  if (!content.id) return callback(new Error('No subject provided'));
  callback(null, content);
};

ops.add = function(content, callback){
  var mongo = model.mongo();
  var article = new mongo(only(content, 'title summary'));
  
  // Add the article to the callback
  article.save(function(err){
    callback(err, content.id, article);
  });
};

ops.addToSubject = function(subjectId, lesson, callback) {
  subject.addLesson(subjectId, lesson._id, function(err, subject){
    callback(err, lesson, subject);
  });
};


// The model that inherits it all
var model = {};


model.mongo = function(){
  return mongoose.model('Lesson', lessonSchema);
};


model.get = function(id, callback){
  
  asyn.waterfall([
    asyn.apply(ops.findById, id),
    ops.findSubject,
    ops.joinSubject
  ], function(err, lesson){
    callback(err, lesson);
  });
};


// Add a new lesson to the database
model.add = function(content, callback){
  
  asyn.waterfall([
    asyn.apply(ops.checkPreviewData, content),
    ops.add,
    ops.addToSubject,
    ops.joinSubject
  ], function(err, lesson){
    callback(err, lesson);
  });
};



module.exports = model;