var model = require('./model');
var passport = require('passport');

exports.get = function(req, res){
  model.findById(req.params.id, function(err, user){
    
    user.favourites = [
      { title: "Fav A", link: "#" },
      { title: "Fav B", link: "#" },
      { title: "Fav C", link: "#" },
    ];
    
    user.recent = [
      { title: "Recent A", link: "#" },
      { title: "Recent B", link: "#" },
      { title: "Recent C", link: "#" },
      { title: "Recent D", link: "#" },
    ];
    
    res.render('user/one', user);
  });
};

exports.login = function(req, res, next){
  
  passport.authenticate('getin', function(err, user, info) {

    // Error situations
    if (err) { return next(err); }
    if (!user) { return res.json({ error: 'Usuario no válido' }); }

    // Valid user, login and send message
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({ error: false });
    });
  })(req, res, next);
};
