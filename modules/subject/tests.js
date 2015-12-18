var test = require('test-controller');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var controller = require('./controller');

// Controllers
describe('controllers/subject.js', function(){
  
  // Add a new subject to the database
  describe('subject.add()', function(){
    
    // The data to be posted
    var entry = { title: "Some title", summary: "Short explanation" };
    
    // Generate a new test with the post data already set
    var add = test(controller.add).auth({ points: 10000 });
    add.request.lang = 'es';
    
    it('needs to be auth', function(done){
      test(controller.add).post(entry, function(err, type, res){
        expect(type).to.equal('next');
        done();
      });
    });
    
    it('needs to have enough points', function(done){
      test(controller.add).auth({ points: 100 }).post(entry, function(err, type, res){
        expect(type).to.equal('next');
        done();
      });
    });
    
    it('adds a new full record', function(done){
      add.post(entry, function(err, type, res){
        expect(type).to.equal('json');
        expect(res.error).to.not.be.ok;
        done();
      });
    });
    
    it('expects a title', function(done){
      add.post(entry).post({ title: "" }, function(err, type, res){
        expect(type).to.equal('next');
        done();
      });
    });
    
    it('expects a summary', function(done){
      add.post(entry).post({ summary: "" }, function(err, type, res){
        expect(type).to.equal('next');
        done();
      });
    });
  });
  
  
  describe('subject.index()', function(){
    
    it('retrieves a list of subjects', function(done){
      test(controller.index).get({}, function(err, type, file, data){
        expect(type).to.equal('render');
        expect(file).to.equal('subject/index');
        expect(data.subject).to.be.instanceOf(Array);
        done();
      });
    });
  });
  
  
  
  describe("subject.update()", function(){
    
    // Retrieve a single subject
    var getSubj = function(callback){
      test(controller.index).req({ lang: 'es' }).get({}, function(err, type, file, subjects){
        callback(subjects.subject.shift());
      });
    };
    
    it("Requires auth", function(done){
      getSubj(function(subj){
        var data = { title: subj.title, summary: subj.summary };
        test(controller.edit)
          .req({ lang: 'es' })
          .get({ id: subj._id })
          .post(data, function(err, type, res){
            expect(type).to.equal('next');
            done();
          });
      });
    });
    
    // These can edit it
    var edit = function(callback){
      getSubj(function(subj){
        var subject = { title: subj.title, summary: subj.summary };
        var auth = test(controller.edit).auth({ points: 1000 }).req({ lang: 'es' });
        callback(auth.get({ id: subj._id }), subject);
      });
    };
    
    it("Can edit it with no modification", function(done){
      edit(function(test, subject){
        test.post(subject, function(err, type, res){
          expect(type).to.equal('json');
          expect(res.error).to.be.not.ok;
          done();
        });
      });
    });
    
    it("Can edit the title", function(done){
      edit(function(test, subject){
        subject.title = "Demo title";
        test.post(subject, function(err, type, res){
          expect(type).to.equal('json');
          expect(res.error).to.be.not.ok;
          done();
        });
      });
    });
    
    it("Can edit the summary", function(done){
      edit(function(test, subject){
        subject.summary = "Demo title";
        test.post(subject, function(err, type, res){
          expect(type).to.equal('json');
          expect(res.error).to.be.not.ok;
          done();
        });
      });
    });
  });
  
  
  describe('subject.get()', function(){
    
    it('retrieves a list of subjects', function(done){
      test(controller.index).get({}, function(err, type, file, data){
        expect(type).to.equal('render');
        expect(file).to.equal('subject/index');
        expect(data.subject).to.be.instanceOf(Array);
        done();
      });
    });
  });
});
