// Routing
var controller = require('../subject/controller');

module.exports = function(router){
  
  router.get('/', controller.index);
  
  return router;
};
