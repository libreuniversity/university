const model = require('./model');
const upload = require('./upload');
const { npm, api, auth } = require('auto-load')('app');
const { moment } = npm;
const bundle = require('./bundle-records');

// Cannot retrieve a list of lessons without context
exports.index = ctx => ctx.res.redirect('/');

// Retrieve a single item
exports.get = async ctx => {
  let lesson = await model.get(ctx.req.params.id);
  lesson = await api.subject.byLesson(lesson);
  ctx.res.render('lesson/get', { lesson });
};

// Save the edited lesson content
exports.save = async ctx => {
  auth(ctx.req.user);
  const lesson = await model.save({
    id: ctx.req.params.id,
    user: ctx.req.user.id,
    content: ctx.req.body.content
  });
  await model.archive(lesson);
  ctx.res.json(lesson);
};

// Upload an image
exports.upload = async ctx => {
  auth(ctx.req.user);
  const data = await upload(ctx.req.files.upload);
  ctx.res.json({
    uploaded: 1,
    fileName: data.name,
    url: data.url.replace('http://', 'https://')
  });
};

exports.records = async ctx => {
  const raw = await model.records(ctx.req);
  const records = bundle(raw);
  ctx.res.render('lesson/records', { records });
};

exports.history = async ctx => {
  let lesson = await model.history(ctx.req);
  const timestamp = { timestamp: moment(lesson.timestamp).fromNow() };
  lesson = Object.assign({}, lesson, timestamp);
  ctx.res.render('lesson/history', { lesson });
};

exports.add = async ctx => {
  auth(ctx.req.user);
  const lesson = await model.add({
    lesson: ctx.req.body,
    user: ctx.req.user,
    language: ctx.req.lang,
    subject: ctx.req.body.subject
  });
  ctx.res.json(lesson);
};

// Update the information from the preview
exports.update = async ctx => {
  auth(ctx.req.user);
  const lesson = await model.update(ctx.req.params.id, {
    lesson: ctx.req.body,
    user: ctx.req.user,
    language: ctx.req.lang,
    subject: ctx.req.body.subject
  });
  ctx.res.json(lesson);
};
