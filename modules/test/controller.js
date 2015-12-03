var crypto = require('crypto');
var asy = require('async');

// Autoload all of the models
var model = require('./model');

// Display all of the questions of a lesson
exports.index = function(req, res, next) {
  
  model.get(req.params.id, function(err, data){
    if (err) return next(err);
    res.render('test/index', data);
  });
};

// Save the test question/answer in the database
exports.add = function(req, res) {

  //model.test.add(req.body.lesson, req.body.question, req.body['answers[]']);

  // Create and save the test entry with the answers ids
  function saveTest(answerIds) {
    var test = new model.test({
      id: crypto.randomBytes(20).toString('hex'),
      lesson: encodeURIComponent(req.body.lesson),
      question: req.body.question,
      answers: answerIds
    });

    test.save(function(err) {
      res.json({ error: err });
    });
  }
  
  function saveAnswer(ans, callback){
    
    var answer = new model.testanswer(ans);
    answer.save(function(err) {
      
      callback(false, answer._id);
    });
  }
  
  var answers = req.body['answers[]'].map((value, index) => ({ text: value, good: !index }));
  
  asy.map(answers, saveAnswer, (err, ids) => saveTest(ids));
};

exports.update = function(req, res) {};
