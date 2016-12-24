let model = require('./model');
let app = require('auto-load')('app');

let data = app.data;

// Retrieve all of the subjects available and display them
exports.index = data(model.index, 'subject').render('subject/index');

// Show a single element
exports.get = data(model.get, 'subject').render('subject/get');

// exports.add = app.data(model.add, 'subject').json();
exports.add = data(req => model.add({
  title: req.body.title, summary: req.body.summary, language: req.lang
})).json();

// Update the information for the subject
exports.edit = data(req => model.edit(req.params.id, {
  title: req.body.title, summary: req.body.summary
})).json();
