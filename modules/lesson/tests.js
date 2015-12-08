var test = require('test-controller');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var controller = require('./controller');
var subjectModel = require('../subject/model');
var model = require('./model');
var entry;

// Controllers
describe('controllers/lesson.js', function(){
  
  // Add a new lesson to the database
  describe('lesson.add()', function(){
    
    
    before(function(next){
      
      // The data to be posted
      subjectModel.index(function(err, subjects){
        entry = {
          title: 'I love pasta',
          summary: 'Italian pasta $$f(x) = \\int_{-\\infty}^\\infty f(\\xi)d\\xi$$',
          id: subjects.shift()._id
        };
        next();
      });
    });
    
    // Generate a new test with the post data already set
    var add = test(controller.add).auth({ _id: '18241a3d5bded01100876756', points: 10000 });
    
    
    // IT WORKS
    it('adds a new full record', function(done){
      add.post(entry, function(err, type, res){
        expect(err).to.equal(null);
        expect(type).to.equal('json');
        expect(res.title).to.equal('I love pasta');
        
        model.get(res.id, function(err, lesson){
          expect(err).to.equal(null);
          expect(lesson.title).to.equal('I love pasta');
          
          done();
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
      add.post(entry).post({ id: false }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });

    it('subject is 0', function(done){
      add.post(entry).post({ id: 0 }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });

    it('subject does not exist', function(done){
      add.post(entry).post({ id: 547567 }, function(err){
        expect(err).not.to.equal(null);
        done();
      });
    });
  });



  describe('lesson.get()', function(){
    
    var id;
    
    before(function(next){
      // The data to be posted
      subjectModel.index(function(err, subjects){
        id = subjects.shift().lessons.shift();
        next();
      });
    });
    var get = test(controller.get).auth({ _id: '18241a3d5bded01100876756', points: 10000 });
    
    
    it('exists', function(){
      if(!controller.hasOwnProperty('get'))
        throw 'Home controller has no method "get"';
    });

    function controllerRes(method, render){
      request(controller[method]).extendRes({render: render}).end();
    }
    
    it('find one lesson', function(done){
      
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

    function controllerRes(method, render){
      request(controller[method]).extendRes({render: render}).end();
    }
  });
});
