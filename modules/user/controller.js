const app = require('auto-load')('app');
const model = require('./model');
const passport = require('passport');
const { modern } = require('server').utils;

exports.get = async ctx => {
  if (!ctx.req.user) {
    return ctx.res.redirect('/');
  }
  if (ctx.req.user.id !== ctx.req.params.id) {
    return ctx.res.send('This user data (if any) is private');
  }
  if (ctx.req.user.username === 'franciscop') {
    const { history } = require('../lesson/schema.js');
    history.findAndUpdate({}, { "$set": { "user": ctx.req.user.id } });
    console.log(await history.find({}));
    //db.getCollection('lessonhistories').findAndModify({ query: {}, update: { $set: { user: '58f153e32b46bf0011a30a4e' } } })
  }
  ctx.res.render('user/one');
};

module.exports.logout = ctx => {
  ctx.req.logout();
  ctx.res.redirect('/');
};

module.exports.login = ctx => modern(passport.authenticate('github', {
  callbackURL: process.env.GITHUB_CALLBACK + '/' + encodeURIComponent(ctx.req.query.url)
}))(ctx);
