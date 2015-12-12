// Routing
var controller = require('./controller');

module.exports = function(router){
  
  router.get('/user/:id', controller.get);
  router.post('/user', controller.login);
  
  return router;
};

