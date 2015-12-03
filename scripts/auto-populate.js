#!/usr/bin/env mocha
// Autoload and run all of the tests
  
// Connect to mongoose
var mongoose = require('mongoose');
var model = {};
['lesson', 'subject', 'test', 'user'].forEach(function(val){
  model[val] = require("../modules/" + val + "/model");
});
model.testanswer = require('../modules/test/modelanswer');
var chance = new require('chance')();

// Delete the database for testing
mongoose.connect('mongodb://localhost', function(){
  
  // var auto = {
  //   generate: function(name, number, call) {
  //     var total = [];
  //     for(var i = 0; i < number; i++){
  //       total.push(call(total));
  //     }
  //   }
  // };
  // 
  // console.log(auto);
  // 
  // auto.generate('subject', 20, function(db){
  //   var title = chance.sentence({ words: 5 }).replace(/\.$/g, '');
  //   return {
  //     title: title,
  //     id: encodeURIComponent(title),
  //     summary: chance.sentence({ words: 22 })
  //   };
  // });
  // 
  // auto.generate('lesson', 20, function(db){
  //   var title = chance.sentence({ words: 5 }).replace(/\.$/g, '');
  //   return {
  //     title: title,
  //     id: encodeURIComponent(title),
  //     summary: chance.sentence({ words: 22 })
  //   };
  // });
    // lesson: {
    //   title: chance.sentence({ words: 5 }).replace(/\.$/g, ''),
    //   id: encodeURIComponent(this.title),
    //   subject: chance.pick(db.subjects)._id,
    //   summary: chance.sentence({ words: 22 })
    // }
  
  
  
  
  
  
  
  
  
  console.log("> Generating new database");
  var log = {};
  var time = new Date().getTime();

  mongoose.connection.db.dropDatabase();

  var calls = [];

  var generate = function(type, ops){
    if (!log[type]) {
      console.log((new Date().getTime() - time) + ' ms');
      time = new Date().getTime();
      console.log("> " + type);
      log[type] = true;
    }
    var temp = {
      title: chance.sentence({ words: 5 }).replace(/\.$/g, ''),
      summary: chance.sentence({ words: 22 })
    };
    for (var key in ops){
      temp[key] = ops[key];
    }
    
    return new model[type].mongo(temp);
  };

  function onSaved(data, type, callback){
    return function(err, value){
      if (err) throw err;
      data[type].push(value);
      callback(data);
    };
  }

  // Add lessons to the database
  function addLesson(callback){
    return function(data){

      // Generate a new lesson
      generate('lesson').save(onSaved(data, 'lessons', callback));
    };
  }
  for(i = 0; i < 20; i++){
    calls.push(addLesson);
  }

  // Add subject to the database
  function addSubject(callback){
    return function(data){
      var extra = { lessons: [
        chance.pick(data.lessons)._id,
        chance.pick(data.lessons)._id,
        chance.pick(data.lessons)._id]
      };
      generate('subject', extra).save(onSaved(data, 'subjects', function(){
        extra.lessons.forEach(function(lesson){
          var subject = data.subjects.slice(-1)[0];
          var set = { $set: { subject: subject._id }};
          model.lesson.update({ _id: lesson }, set, function(){});
        });
        callback.apply(this, arguments);
      }));
      return data;
    };
  }
  for(var i = 0; i < 4; i++){
    calls.push(addSubject);
  }

  // Add answers to the database
  function addAnswer(callback){
    return function(data){
      var extra = {
        text: chance.sentence({ words: 5 }),
        good: chance.bool({ likehood: 25 })
      };
      generate('testanswer', extra).save(onSaved(data, 'answers', callback));
    };
  }
  for(i = 0; i < 1000; i++){
    calls.push(addAnswer);
  }

  // Add tests to the database
  function addTest(callback){
    return function(data){

      var extra = {
        lesson: chance.pick(data.lessons)._id,
        question: chance.sentence({ words: 22 }),
        answers: chance.pick(data.answers, 4).map(function(e){ return e._id; })
      };

      // Generate a new lesson
      generate('test', extra).save(onSaved(data, 'tests', callback));
    };
  }
  for(i = 0; i < 200; i++){
    calls.push(addTest);
  }


  // Finish and return
  calls.push(function(callback){
    return function(data){
      return process.exit();
    };
  });

  // This basically calls each one as callback of the previous
  // last(...(second(first())));
  calls.reverse().reduce(function(callback, current){
    return current(callback);
  }, function(){})({ subjects: [], lessons: [], tests: [], answers: [] });
});
