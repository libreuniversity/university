// let unwind = require('server').router.unwind;

// Import some variables
let routes = require('./loader')('routes.js');
module.exports = Object.keys(routes).reduce((all, key) => {
  return all.concat(routes[key]);
}, []);
