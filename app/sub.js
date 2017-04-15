const { join } = require('server').router;

module.exports = (path, ...middle) => ctx => {
  const full = ctx.req.subdomains.join('.');
  if (typeof path === 'string' && path === full) {
    return join(middle)(ctx);
  }
  if (path instanceof RegExp && path.test(full)) {
    return join(middle)(ctx);
  }
};
