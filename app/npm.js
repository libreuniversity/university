// Load all of the dependencies in camel-case (from dashed names)
// It does NOT load the dev-dependencies
var dep = require('../package').dependencies;
for (var key in dep) {
  var camel = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
  module.exports[camel] = require(key);
}
