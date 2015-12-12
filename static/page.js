// Page
// A minimal engine for loading only page-specific code
// Matches only the first part
var page = function(path, callback){
  
  // The actual function
  var fn = function(){
    
    // Url without leading slash
    var url = window.location.pathname.replace(/^\//, '');
    
    // Check whether we are in the correct page or not
    if (url.match(path)) {
      callback.apply(null, url.match(path).slice(1));
    }
  };
  
  // Add a listener and execute it on ready
  document.addEventListener('DOMContentLoaded', fn);
  
  // Execute it if the DOM is already ready
  if (["complete", "loaded"].indexOf(document.readyState) != -1) {
     fn();
   }
};