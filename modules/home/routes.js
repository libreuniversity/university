const { get, post } = require('server').router;
const controller = require('../subject/controller');

module.exports = [
  get('/', controller.index)
];
