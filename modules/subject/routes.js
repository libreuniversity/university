// FUTURE:
// let controller = require('./controller');
// let { get, post } = require('server').router;
//
// module.exports = [
//   get('/subject', controller.index),
//   get('/subject/:id', controller.get);
//   post('/subject', controller.add);
//   post('/subject/:id', controller.edit);
// ];


// Routing
var controller = require('./controller');

module.exports = function(router){

  router.get('/subject', controller.index);
  router.get('/subject/:id', controller.get);
  router.post('/subject', controller.add);
  router.post('/subject/:id', controller.edit);

  return router;
};
