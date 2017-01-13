// Handle user authentication
module.exports = points => (req, res, next) => {
  if (!req.user) {
    return next(new Error('User must be logged in'));
  }
  if (req.user.points < points) {
    return next(new Error('User has not enough points for this action. ' + points + ' needed'));
  }
  next();
};
