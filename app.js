const server = require('server');
const modern = server.utils.modern;
const { error } = server.router;
const app = require('auto-load')('app');
const passport = require('./modules/user/passport');

server.plugins.push(app.database);

server(app.config, [
  modern(passport.initialize()),
  modern(passport.session()),
  app.middle.user,
  app.middle.local('app/localization', { allow: app.config.languages }),
  app.config.languages.map(lang => app.sub(lang, app.router)),
  app.routerhome,
  error(ctx => {
    console.log('Error:', ctx.error);
    res.render('error/500');
  })
]);
