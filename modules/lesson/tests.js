var test = require('test-controller');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var db = require('./db');
var model = require('./model');
var controller = require('./controller');
var subjectModel = require('../subject/model');
var entry;
var user = { _id: '18241a3d5bded01100876756', points: 10000 };

// Controllers
describe('controllers/lesson.js', function(){
  
  
  // Add a new lesson to the database
  describe('lesson.index()', function(){
    
    // IT WORKS
    it('redirects home', function(done){
      
      // Positive response
      test(controller.index).get({}, function(err, type, res){
        should.not.exist(err);
        expect(type).to.equal('redirect');
        expect(res).to.equal('/');
        done();
      });
    });
  });
  
  
  // Add a new lesson to the database
  describe('lesson.add()', function(){
    
    
    before(function(next){
      
      // The data to be posted
      subjectModel.index({ language: 'es' }, function(err, subjects){
        entry = {
          title: 'I love pasta',
          summary: 'Italian pasta $$f(x) = \\int_{-\\infty}^\\infty f(\\xi)d\\xi$$',
          subject: subjects.shift()._id
        };
        next();
      });
    });
    
    // Generate a new test with the post data already set
    var add = test(controller.add).req({ lang: 'es' }).auth(user);
    
    
    it('requires auth', function(done){
      test(controller.add).post({}, function(err, type, res){
        should.exist(err);
        expect(type).to.equal('next');
        done();
      });
    });
    
    // IT WORKS
    it('adds a new full record', function(done){
      
      // Positive response
      add.post(entry, function(err, type, res){
        should.not.exist(err);
        expect(type).to.equal('json');
        expect(res.title).to.equal('I love pasta');
        
        // Check that it's added to the database
        model.get({ id: res.id, language: 'es' }, function(err, lesson){
          expect(err).to.equal(null);
          expect(lesson.title).to.equal('I love pasta');
          
          // Make sure it's added to history
          db.findHistory(lesson, function(err, lesson){
            expect(lesson.history.length).to.equal(1);
            done();
          });
        });
      });
    });
    
    
    // TITLE
    it('needs a title', function(done){
      add.post(entry).post({ title: null }, function(err){
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
      add.post(entry).post({ summary: null }, function(err){
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
      add.post(entry).post({ subject: false }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });

    it('subject is 0', function(done){
      add.post(entry).post({ subject: 0 }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });

    it('subject does not exist', function(done){
      add.post(entry).post({ subject: 547567 }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });
  });



  describe('lesson.get()', function(){
    
    var id;
    
    before(function(next){
      // The data to be posted
      subjectModel.index({ language: 'es' }, function(err, subjects){
        id = subjects.shift().lessons.shift();
        next();
      });
    });
    
    it('exists', function(){
      if(!controller.hasOwnProperty('get'))
        throw 'Home controller has no method "get"';
    });
    
    it('find one lesson', function(done){
      
      var get = test(controller.get).req({ lang: 'es' }).auth(user);
      get.get({ id: id }, function(err, type, path, lesson){
        expect(err).to.equal(null);
        expect(type).to.equal('render');
        expect(path).to.equal('lesson/get');
        expect(lesson.title).to.equal('I love pasta');
        done();
      });
    });
  });



  describe('lesson.update()', function(){

    it('exists', function(){
      if(!controller.hasOwnProperty('get'))
        throw 'Home controller has no method "get"';
    });
  });
});
