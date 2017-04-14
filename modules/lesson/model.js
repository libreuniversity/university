const model = require('./schema').lesson;
const history = require('./schema').history;

// Retrieve a single element by its id
exports.get = async id => {
  const lesson = await model.findOne({ _id: id }).exec();
  return lesson.toObject({ getters: true });
};






// Mid-legacy

// Save the current document in the db
exports.save = data => model.findByIdAndUpdate(data.id, {
  content: data.content
}, { new: true }).exec().then(lesson => ({ lesson: lesson, user: data.user }));

// Add the current record to history
exports.archive = data => (new history({
  lesson: data.lesson._id,
  user: data.user,
  title: data.lesson.title,
  summary: data.lesson.summary,
  content: data.lesson.content,
  language: data.lesson.language
})).save();

exports.records = req => history.find({ lesson: req.params.id }).sort('-timestamp').exec();

exports.history = req => history.findOne({ _id: req.params.id }).populate('user').exec().then(res => {
  if (!res) throw new Error('History not found');
  return res;
}).then(res => res.toObject({ getters: true }));






// Old-legacy
var app = require('auto-load')('app');
var asyn = require('async');
var only = require('only');
var extend = require('extend');
var ops = app.utils.dbops;
var pipe = require('water-pipe');
var api = app.api;
let modules = app.modules;

var mongo = require('./schema');



// Add a new lesson to the database
module.exports.add = function(data, callback){
  return new Promise((resolve, reject) => {
    pipe(data)
      .pipe(module.exports.checkPreviewData)
      .pipe(api.subject.needed, data.subject)
      .pipe(module.exports.insert)
      .pipe(api.subject.addLesson, data.subject)
      .pipe(module.exports.addToHistory)
      .end((err, data) => err ? reject(err) : resolve(data));
  });
};

module.exports.insert = function (arg, data, callback){
  data.lesson.language = data.language;
  var article = new mongo.lesson(only(data.lesson, 'title summary language'));
  article.save(ops.pass(extend(data, { lesson: article }), callback));
};

// Updates the preview
module.exports.update = function(id, data){
  return new Promise((resolve, reject) => {
    pipe(data)
      .pipe(module.exports.checkPreviewData)
      .pipe(module.exports.set, id)
    .pipe(module.exports.addToHistory)
    .end((err, data) => err ? reject(err) : resolve(data));
  });
};

module.exports.set = function(id, data, callback){
  callback = ops.append(data, callback, 'lesson', true);
  var toUpdate = only(data.lesson, 'title summary content');
  mongo.lesson.findByIdAndUpdate(id, toUpdate, { new: true }, callback);
};

module.exports.addToHistory = function(arg, data, callback){
  var lesson = extend(data.lesson, { user: data.user.id, lesson: data.lesson.id });
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
