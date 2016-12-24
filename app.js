let app = require('auto-load')('app');
let server = require('server');

app.database(app);

var passport = require('./modules/user/passport');
server(app.config, [
  app.middle.env,
  passport.initialize(),
  passport.session(),
  app.middle.user,
  app.middle.local('app/localization', { allow: app.config.languages }),
  app.router
  // app.middle.domai18n(app.config.languages, app.router, app.routerhome)
]);
