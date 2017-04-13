function local (obj) {
  function v (arg) {
    for (var key in arg) {
      // Make sure we're using a $key variable
      var k = key.replace(/^\$/, '');
      // Looparound assertion: www.regular-expressions.info/lookaround.html
      var exp = '(?=^|\\W)(\\$' + k + ')(?=\\W|$)';
      obj = obj.replace(new RegExp(exp), arg[key]);
    }
    return obj;
  }
  v.toString = function () {
    return obj;
  };

  switch (typeof obj) {
    case 'object':
      for (var key in obj) {
        obj[key] = local(obj[key]);
      }
      return obj;
    case 'string':
      return v;
    case 'function':
      return obj;
    default:
      throw new Error('Type of object not supported: ' + (typeof obj));
  }
}

// var test = local({
//   a: 'a $var b',
//   b: '$var b',
//   c: 'a $var',
//   d: 'a $vari b',
//   e: '$vari b',
//   f: 'a $vari',
//   g: name => `a ${ name }`
// });
// console.log(
//   "'" + test.a({ var: "Test" }) + "'",
//   "'" + test.b({ var: "Test" }) + "'",
//   "'" + test.c({ var: "Test" }) + "'",
//   "'" + test.d({ var: "Test" }) + "'",
//   "'" + test.e({ var: "Test" }) + "'",
//   "'" + test.f({ var: "Test" }) + "'",
//   "'" + test.g("Peter") + "'"
// );

var defaults = require('defaults');
var auto = require('auto-load');

// Detect the current language
module.exports = function (where, opt) {
  var opts = defaults(opt, {
    from: 'subdomain',
    allow: ['en', 'es'],
    default: 'en',
    data: auto(where)
  });

  return ({ req, res }) => {
    switch (opts.from) {
      case 'subdomain':
        var sub = req.header('host').split('.').shift();
        req.lang = (opts.allow.indexOf(sub) !== -1) ? sub : opts.default;
        break;
      default: throw new Error('Unknown from: ' + opts.from);
    }

    res.locals.text = local(opts.data[req.lang]);
  };
};
