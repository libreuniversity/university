var asyn = require('async');
var db = require('./db');

module.exports.get = function(id, callback){
  asyn.waterfall([
    asyn.apply(db.findById, id),
    db.findSubject,
  ], function(err, lesson){
    callback(err, lesson);
  });
};

// Add a new lesson to the database
module.exports.add = function(content, callback){
  asyn.waterfall([
    asyn.apply(db.checkPreviewData, content),
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
    asyn.apply(db.update, content),
    db.addToHistory
  ], function(err, lesson){
    callback(err, lesson);
  });
};

// Updates the content
module.exports.save = function(content, callback){
  asyn.waterfall([
    asyn.apply(db.save, content),
    db.addToHistory
  ], function(err, lesson){
    callback(err, lesson);
  });
};