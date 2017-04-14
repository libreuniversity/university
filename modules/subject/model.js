var only = require('only');
var extend = require('extend');

var app = require('auto-load')('app');
var model = require('./schema').subject;
var ops = app.utils.dbops;

// Retrieve all of the elements
module.exports.index = ({ req }) => {
  let query = { language: req.lang, stage: { $in: ['beta', 'production'] } };
  return model.find(query).exec();
};

module.exports.get = id => {
  return model.findOne({ _id: id }).populate('lessons').exec();
}

// Add a new subject to the database
module.exports.add = data => {
  let article = new model(data);
  return article.save();
}

module.exports.edit = (id, data) => {
  return model.findByIdAndUpdate(id, { $set: data }, { new: true }).exec();
};

// Retrieve a subject by lesson
module.exports.byLesson = data => new Promise((resolve, reject) => {
  if (!data._id) reject(new Error('Lesson not found'));
  model.findOne({ lessons: data._id }).lean().then(subject => {
    resolve(Object.assign(data, { subject: subject }))
  });
});

// Add a lesson to a subject
module.exports.addLesson = function(subjectId, data, callback){
  var push = { $push: { lessons: data.lesson._id }};
  model.findByIdAndUpdate(subjectId, push, { new: true }, ops.append(data, callback, 'subject'));
};

module.exports.needed = function(id, data, callback){
  model.findOne({ _id: id }, function(err, subject){
    if (!subject) return callback(new Error("No subject available"));
    callback(err, data);
  });
};
