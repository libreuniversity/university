var sanitize = require('sanitize-html');

var sanitizeOpt = {
  allowedTags: ['h2', 'h3', 'h4', 'br', 'p', 'b', 'i', 'a', 'ul', 'li', 'pre', 'code', 'img'],
  allowedAttributes: { 'a': ['href'], img: ['src'] },
  allowedClasses: {
    'pre': ['js', 'javascript', 'css', 'html', 'pug', 'jade'].map(name => 'language-' + name)
  }
};

module.exports = function(dirty){
  return dirty ? sanitize(dirty.replace(/\<br(\ \/)?\>/g, '\n'), sanitizeOpt) : false;
};
