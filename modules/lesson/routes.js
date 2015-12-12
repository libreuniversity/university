// Routing
var controller = require('./controller');

module.exports = function(router){
  router.post('/lesson', controller.add);
  router.get('/lesson/:id', controller.get);
  router.post('/lesson/:id', controller.update);
  router.post('/lesson/save/:id', controller.save);
  return router;
};
