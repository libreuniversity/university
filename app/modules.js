// Import some variables
var router = require('express').Router();

module.exports = require('./loader')('index.js', router);
