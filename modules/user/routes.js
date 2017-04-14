let { get, post } = require('server').router;
let controller = require('./controller');

module.exports = [
  get('/user/login', controller.login),
  get('/user/logout', controller.logout),
  get('/user/:id', controller.get),
  post('/user', controller.login)
];
