let { get, post } = require('server').router;
var controller = require('../subject/controller');

module.exports = [
  get('/', controller.index)
];
