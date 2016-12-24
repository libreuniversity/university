let { get, post } = require('server').router;
let controller = require('./controller');

module.exports = [
  get('/test', (req, res) => res.redirect('/')),
  get('/test/:id', controller.index),
  post('/test', controller.add),
  post('/test/:id', controller.update)
];
