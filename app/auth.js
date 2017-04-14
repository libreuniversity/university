module.exports = (user, points = 0) => {
  if (!user) {
    throw new Error('You should be a user to edit this');
  }
  if (points && user.points < points) {
    throw new Error('The user does not have enough points');
  }
};
