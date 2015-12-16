var asyn = require('async');
var shortid = require('shortid');
var mongoose = require('mongoose');
var lessonModel = require('../lesson/model');
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

module.exports.get = function(test, callback){
  
  // Retrieve the current lesson and its info
  lessonModel.get(test, function(err, lesson){
      
      if (err) return callback(err);
      
      // Retrieve the current test and its answers
      model.find({ lesson: lesson.id })
        .populate('answers')
        .exec(function(err, tests) {
          
          if (err) return callback(err);

          // Shuffle the test
          tests.shuffle();
          tests.forEach(function(value, i) {
            tests[i].answers.shuffle();
          });

          test = tests.length === 0 ? false : tests[0];
          
          callback(false, { lesson: lesson, question: test });
        });
  });
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