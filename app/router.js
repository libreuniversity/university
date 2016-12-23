// Import some variables
var router = require('express').Router();
require('./loader')('routes.js', router);
module.exports = router;
