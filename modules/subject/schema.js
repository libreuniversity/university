var mongoose = require('mongoose');
var shortid = require('shortid');

var stageProduction = process.env.production ? 'alpha' : 'production';

var data = {
  _id: { type: String, unique: true, default: shortid.generate },
  title: { type: String, required: true, validate: /.+/ },
  summary: { type: String, required: true },
  stage: { type:String, default: stageProduction } ,
  lessons: [{ type: String, ref: 'Lesson' }],
  language: { type: String, required: true, validate: /^(es|en)$/ },
  added: { type: Date, default: Date.now }
};

var subjectSchema = mongoose.Schema(data);
subjectSchema.virtual('id').get(function(){ return this._id; });
subjectSchema.virtual('link').get(function(){ return '/subject/' + this._id; });
module.exports.subject = mongoose.model('Subject', subjectSchema);
