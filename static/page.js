// Pagex
// A minimal engine for loading only page-specific code with regex
var pagex = (function(){
  function pagex(path, negate, callback){

    if (!(this instanceof pagex)) {
      return new pagex(path, negate, callback);
    }

    // Allow it to have different signatures
    if (!callback) {
      callback = negate;
      negate = false;
    }

    // Make sure it's only called once
    var functioncalled = false;

    // The actual function
    var fn = function(){
      if (functioncalled) return;

      // Url without leading slash
      var url = window.location.pathname.replace(/^\//, '');

      // Check whether we are in the correct page or not
      if (path.test(url) != negate) {

        pagex.events.before.forEach(function(cb){
          cb.call(pagex, ret);
        });

        var self = { exports: {} };

        var ret = callback.apply(self, url.match(path) ? url.match(path).slice(1) : []);

        pagex.events.after.forEach(function(cb){
          cb.call(pagex, ret || self.exports);
        });
      }

      functioncalled = true;
    };

    // We want to execute it when the DOM is ready, but not before. So we need to
    // add the listener, but we also need to check if it was already triggered
    document.addEventListener('DOMContentLoaded', fn);

    // The DOM was lodaded already
    if (["interactive", "complete", "loaded"].indexOf(document.readyState) != -1) {
      fn();
    }
  }

  pagex.events = {
    before: [],
    after: []
  };

  pagex.before = function(cb){
    pagex.events.before.push(cb);
  };

  pagex.after = function(cb){
    pagex.events.after.push(cb);
  };

  return pagex;
})();
