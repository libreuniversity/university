var mongoose = require('mongoose');
var lessonModel = require('../lesson/model');

var testSchema = mongoose.Schema({
  id: { type: String, index: true },
  question: { type: String, required: true },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestAnswer'
  }],
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  added: { type: Date, default: Date.now }
});

Array.prototype.shuffle = function() {
  var i = this.length;

  if (!i) {
    return this;
  }
  while (--i) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};

testSchema.statics.get = function(id, callback){
  
  id = encodeURIComponent(id);

  // Retrieve the current lesson and its info
  lessonModel.findOne({ id: id })
    .populate('subject')
    .exec(function(err, lesson){
      
      if (err) return callback(err);

      // Retrieve the current test and its answers
      model.test
        .find({ lesson: lesson._id })
        .populate('answers')
        .exec(function(err, tests) {
          
          if (err) return callback(err);

          // Shuffle the test
          tests.shuffle();
          tests.forEach(function(value, i) {
            tests[i].answers.shuffle();
          });

          test = tests.length === 0 ? false : tests[0];
          
          callback(false, { lesson: lesson, question: test });
        });
  });
};

testSchema.static.add = function(data, callback){
  callback(false, {});
};

module.exports = mongoose.model('Test', testSchema);
module.exports.mongo = module.exports;