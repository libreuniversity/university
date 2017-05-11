var sanitize = require('sanitize-html');
var languages = [
  'apache', 'bash', 'coffeescript', 'cpp', 'cs', 'css', 'diff', 'html', 'http',
  'ini', 'java', 'javascript', 'json', 'makefile', 'markdown', 'nginx', 'perl',
  'objectivec', 'php', 'python', 'ruby', 'sql', 'vbscript', 'xhtml', 'xml'
];

var sanitizeOpt = {
  allowedTags: ['h2', 'h3', 'h4', 'br', 'p', 'strong', 'em', 'a', 'ul', 'li', 'pre', 'code', 'img', 'blockquote'],
  allowedAttributes: { 'a': ['href'], img: ['src'] },
  allowedClasses: {
    'span': ['math-tex'],
    'pre': languages.map(name => 'language-' + name),
    'code': languages.map(name => 'language-' + name)
  }
};

module.exports = function(dirty){
  return dirty ? sanitize(dirty.replace(/\<br(\ \/)?\>/g, '\n'), sanitizeOpt) : false;
};
