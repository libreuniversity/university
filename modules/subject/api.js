var only = require('only');
var model = require('./model.js');

// The publicly accessible methods
var api = [
  'byLesson',
  'addLesson',
  'get',
  'needed'
];

module.exports = function(){
  return only(require('./model'), api);
};
