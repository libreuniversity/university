var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, db){
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  passport.deserializeUser(function(id, done) {
    db.findById(id, function(err, user) {
      done(err, user);
    });
  });
  passport.use('getin', new LocalStrategy({
      usernameField: 'email'
    },
    function(email, password, done) {
      db.findOne({ email: email }, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return db.create({ email: email, password: password}, function(err, user){
            if (err) throw err;
            return done(null, user);
          });
        }
        if (!user.validPassword(password)) {
          console.log("Incorrect password");
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  // Pass the user to all of the templates
  app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
  });
};
