// An alternative way to handle requests
// handle(promise, objectkey)
//   .auth(points) => requires the user to have those amount of points
//   .render() => displays template with the data
//   .json() => sends the data as json through AJAX
//   .auto() => uses either .json() or .render()
let { join } = require('server').router;
let auth = require('./middle/auth');

let handle = function(promise, what) {
  if (!(this instanceof handle)) {
    return new handle(promise, what);
  }

  this.stack = [];
  this.promise = promise;
  this.clean = data => what ? (
    typeof what === 'string' ? ({ [what]: data }) : what(data)
  ) : data;

  this.authorized = user => {
    if (typeof this.points === 'undefined') return true;
    if (!user) return false;
    if (user.points < this.points) return false;
    return true;
  };

  this.middle = [];

  this.render = where => (req, res, next) => {
    if (!this.authorized(req.user)) {
      return next(new Error('You are not authorized'));
    }

    this.stack.reduce((p, fn) => p.then(fn), promise(req, res, next)).then(data => {
      res.render(where, this.clean(data));
    }).catch(err => next(err));
  }

  this.json = () => (req, res, next) => {
    if (!this.authorized(req.user)) {
      return next(new Error('You are not authorized'));
    }
    promise(req, res, next).then(data => {
      res.json(this.clean(data));
    }).catch(err => next(err));
  };

  this.use = (cb) => {
    this.stack.push(cb);
    return this;
  }

  this.auth = (points = 0) => {
    this.points = points;
    return this;
  }

  return this;
};

module.exports = handle;
