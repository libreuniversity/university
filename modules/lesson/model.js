var asyn = require('async');
var db = require('./db');

module.exports.get = function(lesson, nothing, callback){
  asyn.waterfall([
    db.init(lesson, asyn),
    db.findById,
    db.plain,
    db.findSubject,
  ], callback);
};

// Add a new lesson to the database
module.exports.add = function(content, callback){
  asyn.waterfall([
    db.init(content, asyn),
    db.checkPreviewData,
    db.add,
    db.addToHistory,
    db.addToSubject
  ], callback);
};

// Updates the preview
module.exports.update = function(content, callback){
  asyn.waterfall([
    db.init(content, asyn),
    db.update,
    db.addToHistory
  ], callback);
};

// Updates the content
module.exports.save = function(content, callback){
  asyn.waterfall([
    db.init(content, asyn),
    db.save,
    //db.addToHistory
  ], callback);
};