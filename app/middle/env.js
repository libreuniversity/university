module.exports = ({ req, res }) => {
  req.app.locals.env = process.env;
};
