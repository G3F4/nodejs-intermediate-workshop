const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const api = require('./db/api');

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.DB === 'remote' ? 'c2c0e9aa52e3be3c9314' : '7fb8d0a83343f23179f1',
    clientSecret: process.env.DB === 'remote' ? '9bede45ff253717428e0a02fc6c3f6d11d8a1da0' : 'f0cba3f5c1832e8acb09a55117c18ebdd4d99bd4',
    callbackURL: process.env.DB === 'remote' ? 'https://warsawjs-workshop-31.herokuapp.com/auth/github/callback' : 'http://localhost:5000/auth/github/callback'
  },
  (accessToken, refreshToken, profile, cb) => api.getOrCreateUser(profile.id, cb),
));
