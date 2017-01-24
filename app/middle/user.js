module.exports = (req, res, next) => {
  if (req.session && req.query.returnTo) {
    req.session.returnTo = req.query.returnTo;
  }
  if (req.user) {
    req.user.points = req.user.points || 0;
  }
  res.locals.user = req.user;
  next();
};
