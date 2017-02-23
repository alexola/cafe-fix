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
//   User.find({}, (err, user) => {
//     if (err) {
//       next(err);
//   } else {
//       res.render('fix/suggestion', {
//         user: req.user
//     });
//   }
// });

  // });
});

// router.get("/suggestion", (req, res, err) => {
//
// User.find({}, (err, user)  => {
//   if (err) {
//     next(err);
//   } else {
//     res.render(7', { user: req.user});
//   }
// });
//
// });


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


// router.get('/profile', (req, res, next) => {
//  const userName = req.session.currentUser.name;
// User.find({}, (err, users) => {
//
//   if (err) { return next(err)}
//    res.render('fixers/fixer-profile', {
//     users : userName
//
//   });
// });
// });

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
// router.get('/profile', (req, res, next) => {
//  const userName = req.session.currentUser.name;
// User.find({}, (err, users) => {
//
//   if (err) { return next(err)}
//    res.render('fixers/fixer-profile', {
//     users : userName
//
//   });
// });
// });






// router.post('/login', (req, res, next) => {
//  const emailInput = req.body.email;
//  const passwordInput = req.body.password;
//
//  if (emailInput === '' || passwordInput === '') {
//    res.render('auth/login', {
//      errorMessage: 'Enter both email and password to log in.'
//    });
//    return;
//  }
//
//  User.findOne({ email: emailInput }, (err, theUser) => {
//    if (err || theUser === null) {
//      res.render('auth/login', {
//        errorMessage: `There isn't an account with email ${emailInput}.`
//      });
//      return;
//    }
//
//    if (!bcrypt.compareSync(passwordInput, theUser.password)) {
//      res.render('auth/login', {
//        errorMessage: 'Invalid password.'
//      });
//      return;
//    }
//
//    req.session.currentUser = theUser;
//    res.redirect('/profile');
//  });
// });
//
//
// router.get('/logout', (req, res, next) => {
//  if (!req.session.currentUser) {
//    res.redirect('/');
//    return;
//  }
//
//  req.session.destroy((err) => {
//    if (err) {
//      next(err);
//      return;
//    }
//
//    res.redirect('/');
//  });
// });
//


// router.get("/profile/:id", (req, res, next) => {
//   let userId = req.params.id;
//   User.findById(userId, (err, users) =>{
//     if (err) {
//       next(err);
//     } else {
//       res.render("fixers/fixer-profile", {users: user});
//     }
//   });
// });


// router.get('/search', (req, res, next) => {
// User.find({}, (err, users) => {
//
//   if (err) { return next(err) }
//
//   res.render('map/search', {
//     users: users
//   });
// });
// });
//
//


module.exports = router;
