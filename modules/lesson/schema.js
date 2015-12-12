var only = require('only');
var extend = require('extend');
var shortid = require('shortid');
var mongoose = require('mongoose');
var sanitize = require('./sanitize');

var lessonData = {
  _id: { type: String, unique: true, default: shortid.generate },
  title: { type: String, required: true, trim: true },
  summary: { type: String, required: true, trim: true },
  content: { type: String },
  language: { type: String, required: true, validate: /(es|en)/ },
  history: [],  // Otherwise it doesn't appear when adding it dynamically...
  timestamp: { type: Date, required: true, default: Date.now }
};

var lessonSchema = mongoose.Schema(lessonData);
lessonSchema.virtual('html').get(function(){
  return sanitize(this.content);
});
lessonSchema.virtual('id').get(function(){ return this._id; });

var model = mongoose.model('Lesson', lessonSchema);
module.exports.lesson = model;



// History lesson
var historyData = extend(
  only(lessonData, '_id title summary content language timestamp'),
  { lesson: { type: String, unique: false, required: true }},
  { user: { type: String, required: true }}
);

var historySchema = mongoose.Schema(historyData);
historySchema.virtual('html').get(function(){
  return sanitize(this.content);
});

var history = mongoose.model('LessonHistory', historySchema);
module.exports.history = history;
