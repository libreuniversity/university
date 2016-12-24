// Import some variables
// var router = require('express').Router();
// require('./loader')('routes.js', router);
let routes = require('./loader')('routes.js');
module.exports = Object.keys(routes).reduce((all, key) => {
  return all.concat(routes[key]);
}, []);
