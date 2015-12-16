var only = require('only');
var extend = require('extend');

// Just keep passing things forward
module.exports.pass = (el, callback) => err => callback(err, el);

// Pass it forward with some extra elements from the original
module.exports.upgrade = (el, callback, parts) => function(err, next) {
  callback(err, extend(next, only(el, parts)));
};

// Pass it forward with a fetched child
module.exports.append = (el, callback, name, required) => function(err, fetched) {
  if (required && !fetched) callback(new Error(name + " empty, cannot append"));
  el[name] = fetched;
  callback(err, el);
};

module.exports.lean = function(callback){
  return function(err, data){
    callback(err, data && data.toObject ? data.toObject({ getters: true }) : data);
  };
};
