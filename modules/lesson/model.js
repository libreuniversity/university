var asyn = require('async');
var db = require('./db');

var ops = require('auto-load')('app/utils').dbops;
var mongo = require('./schema');


// Retrieve a single element by its id
module.exports.byId = function(id, data, callback){
  
  // Lean makes it behave as a normal object and not a collection
  mongo.lesson.findOne({ _id: id }, ops.lean(callback));
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