// Import some variables
var router = require('express').Router();
var fs = require('fs');
var mvc = {};

var files = fs.readdirSync(__dirname + '/../modules').filter(function(file) {
  var controller = __dirname + '/../modules/' + file + '/controller.js';
  if (fs.existsSync(controller)) {
    mvc[file] = require(controller);
  }
});

/* GET home page */
router.get('/', mvc.subject.index);

router.get('/user/:id', mvc.user.get);
router.post('/user', mvc.user.login);

router.get('/subject', mvc.subject.index);
router.get('/subject/:id', mvc.subject.get);
router.post('/subject', mvc.subject.add);
router.post('/subject/:id', mvc.subject.edit);

router.post('/lesson', mvc.lesson.add);
router.get('/lesson/:id', mvc.lesson.get);
router.post('/lesson/:id', mvc.lesson.update);

router.get('/test', mvc.subject.index);
router.get('/test/:id', mvc.test.index);
router.post('/test', mvc.test.add);
router.post('/test/:id', mvc.test.update);

module.exports = router;
