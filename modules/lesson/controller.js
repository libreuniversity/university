// Autoload all of the models
var model = require('./model');
var extend = require('extend');
var only = require('only');

//var model = require('auto-load')('models');
//var utils = require('auto-load')('app/utils');
var normalDate = require('../../utils/normaldate');
var encode = require('../../utils/encode');
var error = require('../../utils/error');
var utils = require('auto-load')('utils');

// Required points for authorization
var auth = utils.auth({ add: 100, edit: 50 });

var fields = ['id', 'title', 'summary'];

// Retrieve all of the lessons available and display them
exports.index = function(req, res) { res.redirect('/'); };

// Retrieve a single lesson
exports.get = function(req, res, next) {
  model.get(encode(req.params.id), function(err, lesson) {
    if (err) return next(err);
    var link = { link: '/subject/' + lesson.subject.id };
    lesson.subject = extend(lesson.subject, link);
    console.log("Html", typeof lesson.html);
    res.render('lesson/get', lesson);
  });
};

// Add a subject
exports.add = function(req, res, next) {
  
  if (!auth.add(req.user)) return next(error('hack', 400, true));
  
  model.add(req.body, function(err, lesson){
    
    if(err) {
      // The validation error is spit back to the user
      if (err.name == 'ValidationError') {
        return next(error(err.message, 400, 'ajax'));
      }
      
      //console.log(req.body);
      // The internal server error has a different error
      return next(error('Error interno, no se ha podido guardar', 500, 'ajax'));
    }
    
    res.json(lesson);
  });
};


// Update the information
exports.update = function(req, res, next) {

  // Find specific article in db
  var id = encode(req.params.id);
  
  var edit = (req.body.content) ?
    { content: req.body.content } :
    req.body.title ?
      { title: req.body.title, summary: req.body.summary } :
      {};
  
  model.update({ id: id }, edit, function(err, obj) {
    model.get(id, function(err, data) {
      if(err) return next(err);
      res.json({ error: !!err, html: data.html });
    });
  });
};

