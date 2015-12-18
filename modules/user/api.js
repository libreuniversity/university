var only = require('only');
var extend = require('extend');
var model = require('./model');

var api = [
  ''
];

module.exports = only(model, api);

// Optionally set the current user
module.exports.set = function(user, data, callback){
  callback(null, extend(data, { user: user }));
};

// Check authorization
module.exports.auth = function(points, data, callback){
  if (points && !data.user){
    return callback(new Error("No user provided"));
  }
  if (points && data.user.points < points){
    return callback(new Error("This action needs " + points + "points"));
  }
  callback(null, data);
};