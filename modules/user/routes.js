// Routing
var app = require('auto-load')('app');
var controller = require('./controller');

module.exports = function(router){

  router.get('/user/login', app.npm.passport.authenticate('auth0', {
    failureRedirect: '/error',
    failureFlash: true
  }), controller.login);
  router.get('/user/logout', controller.logout);
  router.post('/user', controller.login);

  router.get('/user/:id', controller.get);

  return router;
};
