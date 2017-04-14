const app = require('auto-load')('app');
const model = require('./model');
const passport = require('passport');
const { modern } = require('server').utils;

exports.get = ctx => {
  if (!ctx.req.user) return ctx.res.redirect('/');
  ctx.res.render('user/one');
};

module.exports.logout = ctx => {
  ctx.req.logout();
  ctx.res.redirect('/');
};

module.exports.login = ctx => modern(passport.authenticate('github', {
  callbackURL: process.env.GITHUB_CALLBACK + '/' + encodeURIComponent(ctx.req.query.url)
}))(ctx);
