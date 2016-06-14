// Handle error creating in a simpler way that the default
module.exports = function (message, status, ajax) {
  var err = new Error(message);

  // Options
  if (status instanceof Object) {
    err.ajax = status.ajax || false;
    err.status = status.status || 500;
  } else {
    err.status = status || 500;
    err.ajax = ajax === 'ajax' || ajax === true;
  }

  return err;
};
