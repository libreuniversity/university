var only = require('only');
var model = require('./model');

// The publicly accessible methods
var api = [
  'byLesson',
  'addLesson'
];

module.exports = only(model, api);