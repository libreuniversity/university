// Import some variables
var router = require('express').Router();

module.exports = function () {
  require('./loader')('routes.js', router);
  return router;
};
