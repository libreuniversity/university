var test = require('test-controller');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var controller = require('../modules/lesson/controller');

// Controllers
describe('controllers/lesson.js', function(){
    
  // Add a new lesson to the database
  describe('lesson.add()', function(){
    
    // The data to be posted
    var entry = {
      title: 'I love pasta',
      summary: 'Italian pasta $$f(x) = \\int_{-\\infty}^\\infty f(\\xi)d\\xi$$',
      id: '000000000000000000000000'
    };
    
    // Generate a new test with the post data already set
    var add = test(controller.add).auth({ points: 10000 });
    
    
    // IT WORKS
    it('adds a new full record', function(done){
      add.post(entry, function(err, type, res){
        expect(err).to.be.falsy;
        expect(type).to.equal('json');
        expect(!res.title).to.equal(false);
        done();
      });
    });
    
    
    // TITLE
    it('needs a title', function(done){
      add.post(entry).post({ title: false }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });

    it('empty string as title', function(done){
      add.post(entry).post({ title: '' }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });

    it('whitespace title', function(done){
      add.post(entry).post({ title: ' \n' }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });


    // SUMMARY
    it('needs a summary', function(done){
      add.post(entry).post({ summary: false }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });

    it('empty summary', function(done){
      add.post(entry).post({ summary: '' }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });

    it('whitespace summary', function(done){
      add.post(entry).post({ summary: ' \n' }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });


    // SUBJECT
    it('needs a subject', function(done){
      add.post(entry).post({ id: false }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });

    it('malformed subject', function(done){
      add.post(entry).post({ id: 0 }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });

    it('malformed subject', function(done){
      add.post(entry).post({ id: 547567 }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });

    it('malformed subject', function(done){
      add.post(entry).post({ id: 'fgh345grwe' }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });
  });



  describe('lesson.get()', function(){

    it('exists', function(){
      if(!controller.hasOwnProperty('get'))
        throw 'Home controller has no method "get"';
    });

    function controllerRes(method, render){
      request(controller[method]).extendRes({render: render}).end();
    }
  });
});
