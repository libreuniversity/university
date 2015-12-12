// Import some variables
var router = require('express').Router();
var fs = require('fs');

var passRouter = function(file) {
  var routes = __dirname + '/../modules/' + file + '/routes.js';
  if (fs.existsSync(routes)) {
    router = require(routes)(router);
  }
};

var files = fs.readdirSync(__dirname + '/../modules').forEach(passRouter);
passRouter(__dirname + '/../middle/routes.js');

// Any other route?


module.exports = router;
