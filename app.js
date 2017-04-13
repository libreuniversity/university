const server = require('server');
const modern = server.utils.modern;
const { join, error } = server.router;
const app = require('auto-load')('app');
const passport = require('./modules/user/passport');

const sub = (path, ...middle) => ctx => {
  const full = ctx.req.subdomains.join('.');
  if (typeof path === 'string' && path === full) {
    return join(middle)(ctx);
  }
  if (path instanceof RegExp && path.test(full)) {
    return join(middle)(ctx);
  }
};

app.database(app);

server(app.config, [
  modern(passport.initialize()),
  modern(passport.session()),
  app.middle.user,
  app.middle.local('app/localization', { allow: app.config.languages }),
  app.config.languages.map(lang => sub(lang, app.router)),
  app.routerhome,
  error(ctx => {
    console.log("Error:", ctx.error);
    res.render('error/404');
  })
]);
