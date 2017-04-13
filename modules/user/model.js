var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var createHash = function(password){
 return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

var userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  auth: [{ type: String }],
  username: { type: String },
  language: { type: String },
  image: { type: String },
  points: { type: Number, required:true, default: 2000 },
  added: { type: Date, default: Date.now }
});

userSchema.statics.create = function(data, callback){
  var newUser = new this({
    email: data.email,
    password: createHash(data.password)
  });
  newUser.save(callback);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
