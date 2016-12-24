let { get, post } = require('server').router;
var controller = require('./controller');

module.exports = [
  get('/lesson/:id', controller.get),
  post('/lesson', controller.add),
  post('/lesson/upload', controller.upload),
  post('/lesson/:id', controller.update),
  post('/lesson/save/:id', controller.save)
];
