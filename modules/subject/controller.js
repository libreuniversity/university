let model = require('./model');
let { handle } = require('auto-load')('app');

// Retrieve all of the subjects available and display them
exports.index = handle(model.index, 'subject').render('subject/index');

// Show a single element
exports.get = handle(model.get, 'subject').render('subject/get');

exports.add = handle(req => model.add({
  title: req.body.title, summary: req.body.summary, language: req.lang
})).auth(50).json();

// Update the information for the subject
exports.edit = handle(req => model.edit(req.params.id, {
  title: req.body.title, summary: req.body.summary
})).auth(10).json();
