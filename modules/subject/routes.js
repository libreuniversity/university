// Routing
var controller = require('./controller');

module.exports = function(router){
  
  router.get('/subject', controller.index);
  router.get('/subject/:id', controller.get);
  router.post('/subject', controller.add);
  router.post('/subject/:id', controller.edit);
  
  return router;
};

