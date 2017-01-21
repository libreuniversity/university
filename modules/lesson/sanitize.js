var sanitize = require('sanitize-html');

var sanitizeOpt = {
  allowedTags: ['h2', 'h3', 'h4', 'br', 'p', 'strong', 'em', 'a', 'ul', 'li', 'pre', 'code', 'img', 'blockquote'],
  allowedAttributes: { 'a': ['href'], img: ['src'] },
  allowedClasses: {
    'span': ['math-tex'],
    'pre': ['js', 'javascript', 'css', 'html', 'pug', 'jade'].map(name => 'language-' + name),
    'code': ['js', 'javascript', 'css', 'html', 'pug', 'jade'].map(name => 'language-' + name)
  }
};

module.exports = function(dirty){
  return dirty ? sanitize(dirty.replace(/\<br(\ \/)?\>/g, '\n'), sanitizeOpt) : false;
};
