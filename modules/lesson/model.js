var mongoose = require('mongoose');
var extend = require('extend');
var sanitize = require('sanitize-html');
var only = require('only');
var shortid = require('shortid');
var encode = encodeURIComponent;
var normalDate = require('../../utils/normaldate');
var subject = require('../subject/model').mongo;
var sanitizeOpt = {
  allowedTags: ['h2', 'h3', 'h4', 'br', 'p', 'b', 'i', 'a', 'ul', 'li', 'pre', 'code', 'img'],
  allowedAttributes: { 'a': ['href'], img: ['src'] }
};

var lessonData = {
  id: { type: String, unique: true, default: shortid.generate },
  title: { type: String, required: true, validate: /^[^\s].+[^\s]$/ },
  summary: { type: String, required: true },
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
  copyToHistory(this, this._conditions.id);
});




var model = mongoose.model('Lesson', lessonSchema);
module.exports = model;

module.exports.mongo = module.exports;


module.exports.get = function(id, callback){
  console.log(id);
  model.findOne({ id: id }).exec(function(err, lesson){
    if (err) return callback(err);
    if (!lesson) return callback(new Error("Lección no encontrada"));
    subject.findOne({ lessons: lesson._id }, function(err, subject){
      if (err) return callback(err);
      lesson.subject = subject;
      callback(null, lesson);
    });
  });
};


// Add a new lesson to the database
module.exports.add = function(content, callback){
  
  var subjectId = content.id;
  var article = new model(only(content, ['title', 'summary']));
  
  // Add the article to the callback
  article.save(function(err) {
    if (err) return callback(err);
    var push = { $push: { lessons: article._id }};
    subject.findByIdAndUpdate(subjectId, push, function(err, model){
      callback(err, only(article, ['id', 'title', 'summary', 'content']));
    });
  });
};
