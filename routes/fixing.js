const express = require('express');
const User = require('../models/user');
const Item = require('../models/item');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const router = express.Router();





router.get('/fixers/:id', (req, res, next) => {
  const fixerId = req.params.id;

  User.findById(fixerId, (err, theUser) => {
    if (err) {
      next(err);
      return;
    }

    res.render('fixers/fixer-profile', {
      theFixer: theUser
    });
  });
});


// router.use((req, res, next) => {
//   if (req.session.currentUser) {
//     next();
//     return;
//   }
//
//   res.redirect('/login');
// });
//
// router.get('/profile', (req, res, next) => {
//   let query;
//
//   if (req.session.currentUser.isFixer) {
//     query = { fixer: req.session.currentUser._id };
//   } else {
//     query = { user: req.session.currentUser._id };
//   }
//
//   ItemPickup
//     .find(query)
//     .populate('user', 'name')
//     .populate('fixer', 'name')
//     .sort('pickupDate')
//     .exec((err, pickupDocs) => {
//       if (err) {
//         next(err);
//         return;
//       }
//
//       res.render('fixers/fixer-profile', {
//         pickups: pickupDocs
//       });
//     });
// });
//
// router.post('/suggestion', (req, res, next) => {
//   const userId = req.session.currentUser._id;
//   const fixerInfo = {
//     fee: req.body.fee,
//     isFixer: true
//   };
//
//   User.findByIdAndUpdate(userId, fixerInfo, { new: true }, (err, theUser) => {
//     if (err) {
//       next(err);
//       return;
//     }
//
//     req.session.currentUser = theUser;
//
//     res.redirect('/fixer-profile');
//   });
// });
//
//
// router.get('/suggestion', (req, res, next) => {
//   User.find({ isFixer: true }, (err, fixersList) => {
//     if (err) {
//       next(err);
//       return;
//     }
//
//     res.render('fixers/suggestion', {
//       fixers: fixersList
//     });
//   });
// });
//
//
//
//
// router.post('/item-pickups', (req, res, next) => {
//   const pickupInfo = {
//     pickupDate: req.body.pickupDate,
//     fixer: req.body.fixerId,
//     user: req.session.currentUser._id
//   };
//
//   const thePickup = new Item(pickupInfo);
//
//   thePickup.save((err) => {
//     if (err) {
//       next(err);
//       return;
//     }
//
//     res.redirect('/fixer-profile');
//   });
// });


module.exports = router;
