// Handle user authentication
module.exports = (user, points = 0) => {
  if (!user) {
    throw new Error('You should be a user to edit this');
  }
  if (points && user.points < points) {
    throw new Error(`User has not enough points for this action. ${ points } needed`);
  }
};
