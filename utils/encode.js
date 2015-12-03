// Encode a url component to make it safe
module.exports = function(text){
  return encodeURIComponent(text);
};
