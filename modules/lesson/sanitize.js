var sanitize = require('sanitize-html');

var sanitizeOpt = {
  allowedTags: ['h2', 'h3', 'h4', 'br', 'p', 'b', 'i', 'a', 'ul', 'li', 'pre', 'code', 'img'],
  allowedAttributes: { 'a': ['href'], img: ['src'] }
};

module.exports = function(dirty){
  return dirty ? sanitize(dirty, sanitizeOpt) : false;
};
