let { get, post } = require('server').router;
let controller = require('./controller');

module.exports = [
  ctx => { console.log(ctx.req.user); },
  get('/user/login', controller.login),
  get('/user/logout', controller.logout),
  get('/user/:id', controller.get),
  post('/user', controller.login)
];
