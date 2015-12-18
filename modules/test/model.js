var asyn = require('async');
var extend = require('extend');
var shortid = require('shortid');
var mongoose = require('mongoose');
var lessonModel = require('../lesson/model');
var app = require('auto-load')('app');
var api = app.api();
var ops = app.utils.dbops;
var answerModel = require('./modelanswer');

var testSchema = mongoose.Schema({
  _id: { type: String, unique: true, default: shortid.generate },
  question: { type: String, required: true },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestAnswer'
  }],
  lesson: { type: String, ref: 'Lesson' },
  added: { type: Date, default: Date.now }
});

testSchema.virtual('id').get(function(){ return this._id; });

var model = mongoose.model('Test', testSchema);

function shuffle(o){
  if (!o) return false;
  if (o.length === 1) return o;
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

// Retrieve the current test and its answers
module.exports.get = function(id, data, callback){
  callback = ops.append(data, callback, 'test');
  model.find({ lesson: id }).populate('answers').exec(callback);
};

module.exports.choose = function(arg, data, callback){
  
  if (!data.test || !data.test.length) {
    return callback(null, extend(data, { test: false }));
  }
  
  data.test = shuffle(data.test);
  data.test = data.test[0];
  data.test.answer = shuffle(data.test.answer);
  
  callback(false, data);
};

module.exports.add = function(data, callback){
  
  // Create and save the test entry with the answers ids
  function saveTest(answerIds) {
    var test = new model({
      lesson: data.lesson,
      question: data.question,
      answers: answerIds
    });

    test.save(function(err) {
      callback(err, test);
    });
  }
  
  function saveAnswer(ans, callback){
    
    var answer = new answerModel(ans);
    answer.save(function(err) {
      
      callback(false, answer._id);
    });
  }
  
  var answers = data['answers[]'].map((value, index) => ({ text: value, good: !index }));
  
  asyn.map(answers, saveAnswer, (err, ids) => saveTest(ids));
};

module.exports.mongo = model;