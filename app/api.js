// Load each of the modules API
let all;
module.exports = new Proxy({}, {
  get: (orig, key) => {
    if (orig[key]) return orig[key];
    if (!all) all = require('./loader')('api.js');
    return all[key];
  }
});
