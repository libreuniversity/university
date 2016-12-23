// This tries to load some files from all modules
var fs = require('fs');

// It accepts a filename to be included and it'll build it in tree-mode
// If a second variable is passed it will call in chain the file with the variable
module.exports = function (filename, concat) {
  var files = {};

  // The one in the root is the first one to be read
  if (fs.existsSync(__dirname + '/../' + filename)) {
    files = require(__dirname + '/../' + filename);
  }

  // Then add each of the modules ones
  fs.readdirSync(__dirname + '/../modules').forEach(function (folder) {
    var file = __dirname + '/../modules/' + folder + '/' + filename;
    if (fs.existsSync(file)) {
      files[folder] = require(file);
      if (files[folder] && concat) {
        concat = files[folder](concat);
      }
    }
  });

  return concat || files;
};
