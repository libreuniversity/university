// This tries to load some files from all modules
// First from the generic module then from each of them
var fs = require('fs');

module.exports = function(filename, concat){
  var files = {};
  
  fs.readdirSync(__dirname + '/../modules').forEach(function(folder){
    
    var file = __dirname + '/../modules/' + folder + '/' + filename;
    if (fs.existsSync(file)) {
      files[folder] = require(file);
      if (concat) {
        concat = files[folder](concat);
      }
    }
  });
  
  return (concat) ? concat : files;
};

