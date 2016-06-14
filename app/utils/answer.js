module.exports.ajax = function (res, next) {
  return function (err, data) {
    if (err) return next(err);
    res.json(data);
  };
};

module.exports.view = function (res, next, template) {
  return function (err, data) {
    if (err) return next(err);
    res.render(template, data);
  };
};
