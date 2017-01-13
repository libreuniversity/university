let subdomain = require('express-subdomain');
let join = require('server').router.join;

module.exports = (langs = [], main = [], landing = main) => join(
  langs.map(lang => subdomain(lang, join(main))),
  subdomain('www', join(landing)),
  join(landing)
);
