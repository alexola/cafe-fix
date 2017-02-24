const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Item = require('../models/item');
const auth    = require('../helpers/auth');
const router = express.Router();
const passport 			= require('passport');
const LocalStrategy = require("passport-local").Strategy;
const bcryptSalt = 10;

router.get('/', function(req, res, next) {
  res.render('index');
});
// router.get("/suggestion", (req, res, err) => {

router.get('/profile', auth.checkLoggedIn('You must be logged in', '/login'), function(req, res, next) {
  console.log('user ', req.user);
  Item.find({user: req.user._id}, (err,items) => {
    if (err){
      next(err);
    } else {
        console.log('items ', items);
        res.render('fixers/fixer-profile', { user: req.user, items: items });
      }
  });
});
router.get("/suggestion", auth.checkLoggedIn('You must be logged in', '/login'), (req, res, err) => {

    User.find({}, (err, user) => {
        if (err) {
            next(err);
        } else {
            res.render('fix/suggestion', {
                user: req.user
            });
        }
    });

});


router.get("/suggestion", auth.checkLoggedIn('You must be logged in', '/login'), (req, res, err) => {

Item.find({}, (err, user)  => {
  if (err) {
    next(err);
  } else {
    res.render('fix/suggestion', { user: req.user});
  }
});

});


router.get('/signup', function(req, res, next) {
  res.render('auth/signup', { "message": req.flash("error") });
});


router.post("/signup", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  if (email === "" || password === "") {
  	req.flash('error', 'Indicate email and password' );
    res.render("auth/signup", { "message": req.flash("error") });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
    	req.flash('error', 'The email already exists' );
      res.render("auth/signup", { message: req.flash("error") });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      name,
      email,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
      	req.flash('error', 'The email already exists' );
        res.render("auth/signup", { message: req.flash('error') });
      } else {
        passport.authenticate("local")(req, res, function () {
           res.redirect('/profile');
        });
      }
    });
  });
});




router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });


});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));


router.get("/logout", (req, res) => {
  req.logout();
  delete res.locals.currentUser;
  delete req.session.passport;
  // delete currentUser and passport properties
  // becasuse when we calling req.logout() is leaving an empty object inside both properties.
  res.redirect('/');
});



module.exports = router;
