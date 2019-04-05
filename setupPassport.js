const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: '7fb8d0a83343f23179f1',
    clientSecret: 'f0cba3f5c1832e8acb09a55117c18ebdd4d99bd4',
    callbackURL: 'http://localhost:5000/auth/github/callback'
  },
  (accessToken, refreshToken, profile, cb) => {
    cb(null, { id: profile.id });
  },
));
