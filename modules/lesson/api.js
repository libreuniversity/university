var only = require('only');
var model = require('./model.js');

// The publicly accessible methods
var api = [
  'get',
];

module.exports = only(require('./model'), api);
