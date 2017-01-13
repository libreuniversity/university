// Get which modules are active and which not
module.exports = require('fs').readdirSync(__dirname + '/../modules').reduce((obj, one) => {
  obj[one] = true;
  return obj;
}, {});
