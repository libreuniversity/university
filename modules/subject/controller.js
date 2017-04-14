const { auth } = require('auto-load')('app');
const model = require('./model');

// Retrieve all of the subjects available and display them
exports.index = async ctx => {
  const subject = await model.index(ctx);
  ctx.res.render('subject/index', { subject });
};

// Show a single element
exports.get = async ctx => {
  const subject = await model.get(ctx.req.params.id);
  ctx.res.render('subject/get', { subject });
};

exports.add = async ctx => {
  auth(ctx.req.user);
  const subject = await model.add({
    title: ctx.req.body.title,
    summary: ctx.req.body.summary,
    language: ctx.req.lang
  });
  ctx.res.json(subject);
};

// Update the information for the subject
exports.edit = async ctx => {
  auth(ctx.req.user);
  const subject = await model.edit(ctx.req.params.id, {
    title: ctx.req.body.title,
    summary: ctx.req.body.summary
  });
  ctx.res.json(subject);
};
