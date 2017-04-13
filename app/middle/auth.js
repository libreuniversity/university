// Handle user authentication
module.exports = points => async ctx => {
  if (!req.user) {
    throw new Error('User must be logged in');
  }
  if (req.user.points < points) {
    throw new Error(`User has not enough points for this action. ${ points } needed`);
  }
};
