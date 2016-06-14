module.exports = function (arg, data, callback) {
  console.log(arguments);
  callback(null, data);
};
