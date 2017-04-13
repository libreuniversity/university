// Handle the errors from the middleware
module.exports = function (err, req, res) {
  console.log(err);
  console.error(err.stack);

  // Default error
  err = err || new Error();
  err.status = err.status || 404;

  // If ajax call
  if (err.ajax === true) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(err.status).render('error/404', { message: err.message });
  }
};
