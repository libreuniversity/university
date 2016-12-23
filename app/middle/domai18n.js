let subdomain = require('express-subdomain');
let express = require('express');

let { use } = require('server').router;

module.exports = (langs, main, landing) => {
  let router = express.Router();

  langs.forEach(lang => {
    router.use(subdomain(lang, main));
  });

  if (landing) {
    router.use(subdomain('www', use(router)));
    router.use(landing);
  }

  return router;
};
