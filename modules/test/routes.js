// Routing
var controller = require('./controller');

module.exports = function(router){
  
  router.get('/test', function(req, res){ res.redirect('/'); });
  router.get('/test/:id', controller.index);
  router.post('/test', controller.add);
  router.post('/test/:id', controller.update);
  
  return router;
};

