var mongoose = require('mongoose');

var testAnswerSchema = mongoose.Schema({
  id: { type: String, index: true },
  testId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test'
  },
  text: { type: String, required: true },
  good: Boolean,
  added: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestAnswer', testAnswerSchema);
module.exports.mongo = module.exports;