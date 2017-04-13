const passport = require('passport');

const server = require('server');
const { get } = server.router;
const { modern } = server.utils;

module.exports = [
  ctx => console.log(ctx.req.user),
  get('/auth/:url?', modern(passport.authenticate('github')), ctx => {
    ctx.res.redirect(ctx.req.params.url);
  }),
  get(ctx => ctx.res.render('home/info'))
];
