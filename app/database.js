const mongoose = require('mongoose');

module.exports = {
  name: 'db',
  options: {
    uri: 'mongodb://localhost'
  },
  init: async ctx => {
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.MONGOLAB_URI || ctx.options.db.uri);
  }
};
