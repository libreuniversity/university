const passport = require('passport');
const passportGithub = require('passport-github')
const User = require('./model');

const getEmail = emails => {
  if (emails.filter(e => e.verified && e.primary).length) {
    return emails.filter(e => e.verified && e.primary)[0].value;
  }
  if (emails.filter(e => e.verified).length) {
    return emails.filter(e => e.verified)[0].value;
  }
  if (emails.filter(e => e.primary).length) {
    return emails.filter(e => e.primary)[0].value;
  }
  return emails[0].value;
}

const done = async (accessToken, refreshToken, profile, cb) => {
  try {
    const data = {
      name: profile.displayName || profile._json.login,
      email: getEmail(profile.emails),
      auth: ['github:' + profile.id],
      username: profile._json.login,
      language: profile.language || 'en',
      image: (profile.photos[0] || { value: '' }).value
    };
    let user = await User.findOne({ auth: { $in: data.auth } });
    if (!user) {
      user = new User(data);
      await user.save();
    }
    cb(null, user);
  } catch (err) {
    cb(err);
  }
};

const github = new passportGithub.Strategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  scope: 'user:email',
}, done);

passport.use(github);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findOne({ _id: id }, done));

module.exports = passport;
