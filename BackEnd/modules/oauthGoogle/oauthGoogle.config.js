const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const initGooglePassport = () => {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GO_CLIENT_ID,
      clientSecret: process.env.GO_CLIENT_SECRET,
      callbackURL: process.env.GO_CB_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("user profile", profile);

      return done(null, profile);
    },
  ),
);

module.exports = { initGooglePassport };
