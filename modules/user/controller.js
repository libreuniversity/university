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
    await history.update({}, { 'user': '' + ctx.req.user.id }, { multi: true });
    const all = await history.find({});
    console.log(all.map(story => story.user));
    //db.getCollection('lessonhistories').findAndModify({ query: {}, update: { $set: { user: '' } } })
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
