var test = require('test-controller');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var controller = require('../modules/test/controller');

// Controllers
describe('controllers/test.js', function(){
  
  // Add a new test to the database
  describe('test.add()', function(){
    
    // The data to be posted
    var entry = {
      question: 'Do you like ice cream?',
      'answers[]': ['Yes!', 'Maybe', 'No ):', 'F*** off'],
      lesson: '000000000000000000000000'
    };
    
    // Generate a new test with the post data already set
    var add = test(controller.add).auth({ points: 10000 }).post(entry);
    
    
    // IT WORKS
    it('adds a new full record', function(done){
      add.post({}, function(err, type, res){
        expect(type).to.equal('json');
        expect(res.error).to.equal(null);
        done();
      });
    });


    it('a wrong record fails', function(done){
      add.post({ question: false }, function(err, type, res){
        expect(type).to.equal('json');
        expect(res.error).not.equal(false);
        done();
      });
    });
  });
});