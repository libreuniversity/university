
var asyn = require('async');

module.exports = function(callback, arg){
  
  var callbacks = [];
  
  // Add it as the first parameter to the callback
  // The first parameter has no data to send back, so we mock it
  if (callback && typeof callback === 'function') {
    callbacks.push(asyn.apply(callback, arg, {}));
  }
  
  var response = {
    pipe: repipe.bind(this, callbacks),
    end: end.bind(this, callbacks)
  };
  
  // The first one behaves differently so we re-define it
  function repipe(callbacks, callback, arg){
    if (callback && typeof callback === 'function'){
      callbacks.push(asyn.apply(callback, arg));
    }
    
    //response.end = response.end.bind(this, callbacks);
    return response;
  }
  
  function end(callbacks, callback){
    asyn.waterfall(callbacks, callback);
  }
  
  return response;
};