let { get, post } = require('server').router;
let controller = require('./controller');

module.exports = [
  get('/subject', controller.index),
  get('/subject/:id', controller.get),
  post('/subject', controller.add),
  post('/subject/:id', controller.edit)
];
