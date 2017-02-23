const bcrypt        = require("bcrypt");
const passport             = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const User          = require('../models/user');
passport.serializeUser((user, cb)   => {
  cb(null, user); }
);

passport.deserializeUser((user, cb) => {
  cb(null, user); });

passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
	passReqToCallback: true
	}, (req, email, password, next) => {
	  User.findOne({ email }, (err, user) => {
	    if (err) {
	      return next(err);
	    }
	    if (!user) {
	      return next(null, false, { message: "Incorrect email" });
	    }
	    if (!bcrypt.compareSync(password, user.password)) {
	      return next(null, false, { message: "Incorrect password" });
	    }

	    return next(null, user);
	  });
	}));

 module.exports = passport;
