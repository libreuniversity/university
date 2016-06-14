// A clean url module
// through several redirects, it allows for formatting the urls as you like them

// options:
//   trustedheader: false;
//     Trust the https header from heroku

module.exports = function (options) {
  options = options || {};

  return function (req, res, next) {
    var newDomain = domain(req, options);
    if (newDomain) {
      return res.redirect(301, newDomain);
    }

    // Heroku always returns `req.secure == false`, but it forwards the header
    // `x-forward-proto` (securely behind a proxy), so if we are using Heroku we
    // can trust it. Don't trust it if the header is not set server-side (default)
    options.trustheader = options.trustheader || false;

    // Force https
    // Heroku sets the x-forwarded-proto header and it's secure
    if (options.trustheader && options.https && !req.secure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect(301, 'https://' + req.get('Host') + req.url);
    }

    next();
  };
};

// Force a specific domain. This is useful when you have both the .com & .org
// It can also be used to force "www.", but there's a better module for this
var domain = function (req, options) {
  // Better naming for variables
  var host = req.get('Host');
  var wanted = options.domain || false;
  var localhost = options.localhost !== false;   // note: "!==" is not "!="

  // If we don't want to match anything we cannot force it to match something
  if (!wanted) {
    return false;
  }

  // localhost:[0-9]+ is exempted
  if (localhost && host.match(/^localhost\:[0-9]+/)) {
    return false;
  }

  // If the domain is the specified one, no problem
  if (host.indexOf(wanted, host.length - wanted.length) > -1) {
    return false;
  }

  // Last case is the failing one
  return 'https://' + wanted + req.url;
};
