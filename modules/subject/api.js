var only = require('only');
var model = require('./model');

// The publicly accessible methods
var api = [
  'byLesson'
];

module.exports = only(model, api);