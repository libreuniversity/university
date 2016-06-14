module.exports = function (obj) {
  var checker = {};
  for (var key in obj) {
    checker[key] = function (user, prev, callback) {
      if (!user || !user.points || user.points < obj[key]) {
        return callback(new Error('User not authorized for: "' + key + '"'));
      }
      callback(null, prev);
    };
  }
  return checker;
};
