// data(promise, objectkey)
//   .render() => displays template with the data
//   .json() => sends the data as json through AJAX
//   .auto() => uses either .json() or .render()
let data = function(promise, what) {
  if (!(this instanceof data)) {
    return new data(promise, what);
  }

  this.stack = [];
  this.promise = promise;
  this.clean = data => what ? (
    typeof what === 'string' ? ({ [what]: data }) : what(data)
  ) : data;

  this.render = where => (req, res, next) => {
    promise(req, res, next).then(data => {
      res.render(where, this.clean(data));
    }).catch(err => next(err));
  };

  this.json = () => (req, res, next) => {
    promise(req, res, next).then(data => {
      res.json(this.clean(data));
    }).catch(err => next(err));
  };

  this.use = () => (fn) => {
    this.stack.push(fn);
  };

  return this;
};

module.exports = data;
