
module.exports = function(timestamp){
  var date = new Date(timestamp);
  return {
    time: date.getHours() + ':' + date.getMinutes(),
    day: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  };
};
