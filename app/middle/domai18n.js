const subdomain = require('express-subdomain');
const server = require('server');
const { modern } = server.utils;
const { join } = require('server').router;

module.exports = (lang, home = lang) => ctx => {
  if (ctx.req.subdomains.length > 1) {
    throw new Error('Only one subdomain valid! Not two:', ctx.req.subdomains);
  }
  const sub = ctx.req.subdomains[0];
  if (!sub || sub === 'www') {
    return join(home)(ctx);
  } else {
    join(lang)(ctx);
  }
};
