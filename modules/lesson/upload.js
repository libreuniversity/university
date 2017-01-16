const cloudinary = require('auto-load')('app').npm.cloudinary;

module.exports = file => {
  cloudinary.config({
    cloud_name: process.env.cloud,
    api_key: process.env.key,
    api_secret: process.env.secret
  });

  // This answer is needed exactly by CKEditor API
  return cloudinary.uploader.upload(file.path)
    .then(res => Object.assign({}, res, { name: file.name }));
}
