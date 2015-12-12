// Import some variables
var router = require('express').Router();

module.exports = require('./loader')('routes.js', router);
