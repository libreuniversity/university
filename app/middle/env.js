module.exports = (req, res, next) => {
  req.app.locals.env = process.env;
  next();
};
