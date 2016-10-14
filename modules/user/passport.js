var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:       process.env.AUTH0_DOMAIN,
    clientID:     process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:  process.env.AUTH0_CALLBACK_URL || 'http://es.libre.com:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  var locale = user.locale || user._json ? user._json.lang || 'en' : 'en';
  var publicUser = {
    id: user.id,
    name: user.displayName,
    username: user._json.nickname,
    email: user._json.email,
    image: user._json.picture_large || user.picture,
    language: locale.split(/[_-]+/)[0] || 'en',
    gender: user.gender
  };
  console.log("User:", publicUser, user);
  done(null, publicUser);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
