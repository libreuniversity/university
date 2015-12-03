module.exports = function(obj){
  var checker = {};
  for (var key in obj) {
    checker[key] = function(user){
      return (user && user.points >= obj[key]);
    };
  }
  return checker;
};