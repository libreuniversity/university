var only = require('only');
var extend = require('extend');
var shortid = require('shortid');
var mongoose = require('mongoose');

var data = {};

data.lesson = {
  _id: { type: String, unique: true, default: shortid.generate },
  title: { type: String, required: true, trim: true },
  summary: { type: String, required: true, trim: true },
  content: { type: String },
  timestamp: { type: Date, required: true, default: Date.now }
};

data.history = extend(
  only(data.lesson, '_id title summary content timestamp'),
  { id: { type: String, unique: false, required: true }},
  { user: { type: String, required: true }}
);

module.exports = data;
