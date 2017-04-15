// Handle user authentication
module.exports = points => async ctx => {
  if (!ctx.req.user) {
    throw new Error('You should be a user to edit this');
  }
  if (ctx.req.user.points < points) {
    throw new Error(`User has not enough points for this action. ${ points } needed`);
  }
};
