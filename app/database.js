module.exports = app => {
  app.npm.mongoose.Promise = global.Promise;
  let uri = process.env.MONGOLAB_URI || 'mongodb://localhost';
  app.npm.mongoose.connect(uri, function(err){
    if (err) return console.error(err);
  });
}
