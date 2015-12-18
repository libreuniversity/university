var only = require('only');
var model = require('./model.js');

// The publicly accessible methods
var api = [
  'byLesson',
  'addLesson',
  'get',
  'needed'
];

api.forEach(function(mod){
  module.exports[mod] = function(){
    var args = Array.prototype.slice.call(arguments);
    return model[mod].apply(this, args);
  };
});

module.exports.byLesson = require('./model').byLesson;
module.exports.addLesson = require('./model').addLesson;
module.exports.get = require('./model').get;
module.exports.needed = require('./model').needed;

