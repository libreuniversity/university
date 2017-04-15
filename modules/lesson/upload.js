const cloudinary = require('auto-load')('app').npm.cloudinary;

module.exports = async file => {
  cloudinary.config({
    cloud_name: process.env.cloud,
    api_key: process.env.key,
    api_secret: process.env.secret
  });

  // This answer is needed exactly by CKEditor API
  const res = await cloudinary.uploader.upload(file.path);
  return Object.assign({}, res, { name: file.name });
}
