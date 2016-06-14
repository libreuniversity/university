// Routing
var controller = require('./controller');

module.exports = function(router){

  router.get('/research', controller.index);
  router.get('/research/:id', controller.get);
  router.post('/research', controller.add);
  router.post('/research/:id', controller.edit);

  return router;
};
