var only = require('only');
var extend = require('extend');
var crypto = require('crypto');

// Autoload all of the models
var model = require('./model');




function ajax(res, next){
  return function(err, lesson){
    if (err) return next(err);
    res.json(lesson);
  };
}


// Display all of the questions of a lesson
exports.index = function(req, res, next) {
  
  model.get({ id: req.params.id, language: req.lang }, function(err, data){
    if (err) return next(err);
    res.render('test/index', data);
  });
};


// Add a test
exports.add = function(req, res, next) {
  //if (!auth.add(req.user)) return next(error('hack', 400, true));
  var data = extend(req.body, { user: req.user._id, language: req.lang });
  model.add(data, ajax(res, next));
};


// Save the test question/answer in the database




exports.update = function(req, res) {};
