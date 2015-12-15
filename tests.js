// Autoload and run all of the tests
var chai = require('chai');

// Connect to mongoose
var mongoose = require('mongoose');


mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// Delete the database for testing
describe("Initialize the tests", function(){
  it("Delete the database", function(done){
    
    mongoose.connect('mongodb://localhost', function(){
      mongoose.connection.db.dropDatabase(function(){
        done();
      });
    });
  });
});

// Load and include all of the tests
require('./modules/subject/tests');
require('./modules/lesson/tests');
require('./modules/test/tests');


// Delete the database for testing
describe("Close the tests", function(){
  it("Delete the database", function(done){
    
    mongoose.connect('mongodb://localhost', function(){
      mongoose.connection.db.dropDatabase(function(){
        done();
      });
    });
  });
});
