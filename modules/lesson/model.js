var asyn = require('async');
var db = require('./db');

module.exports.get = function(lesson, callback){
  asyn.waterfall([
    db.init(lesson, asyn),
    db.findById,
    db.findSubject,
  ], function(err, lesson){
    callback(err, lesson);
  });
};

// Add a new lesson to the database
module.exports.add = function(content, callback){
  asyn.waterfall([
    db.init(content, asyn),
    db.checkPreviewData,
    db.add,
    db.addToHistory,
    db.addToSubject
  ], function(err, lesson){
    callback(err, lesson);
  });
};

// Updates the preview
module.exports.update = function(content, callback){
  asyn.waterfall([
    db.init(content, asyn),
    db.update,
    db.addToHistory
  ], function(err, lesson){
    callback(err, lesson);
  });
};

// Updates the content
module.exports.save = function(content, callback){
  asyn.waterfall([
    db.init(content, asyn),
    db.save,
    db.addToHistory
  ], function(err, lesson){
    callback(err, lesson);
  });
};