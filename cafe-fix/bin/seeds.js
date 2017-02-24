const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;


mongoose.connect('mongodb://localhost:27017/coffee-fix');
var salt = bcrypt.genSaltSync(bcryptSalt);
const password = "1234";
var encryptedPass = bcrypt.hashSync(password, salt);
const users = [

 {
   name: 'Alejandro Olalde',
   email: "alexola.22@gmail.com",
   password: encryptedPass,
   isFixer: true,
   fee: 20,
   location: {
       type: "Point",
       coordinates: [41.394846, 2.190345]
     }
 },

 {
   name: 'Nicholas Rodman',
   email: "nick@ironhack.com",
   password: encryptedPass,
   isFixer: true,
   fee: 20,
   location: {
       type: "Point",
       coordinates: [41.403075, 2.171006]
     }
 },

 {
   name: 'Thor Jubera',
   email: "thor@ironhack.com",
   password: encryptedPass,
   isFixer: true,
   fee: 20,
   location: {
       type: "Point",
       coordinates: [41.386056, 2.179599]
     }
 },

 {
   name: 'Charlie Iniesta',
   email: "charlie@ironhack.com",
   password: encryptedPass,
   isFixer: true,
   fee: 20,
   location: {
       type: "Point",
       coordinates: [41.388045, 2.181162]
     }
 },

 {
   name: 'Matias Lorenzo',
   email: "matias@ironhack.com",
   password: encryptedPass,
   isFixer: true,
   fee: 20,
   location: {
       type: "Point",
       coordinates: [41.387466, 2.148415]
     }
 },

 {
   name: 'Marc LLopis',
   email: "marc@ironhack.com",
   password: encryptedPass,
   isFixer: true,
   fee: 20,
   location: {
       type: "Point",
       coordinates: [41.408769, 2.189189]
     }
 },

 {
   name: 'Michiael Barnaart',
   email: "michiel@ironhack.com",
   password: encryptedPass,
   isFixer: true,
   fee: 20,
   location: {
       type: "Point",
       coordinates: [41.398763, 2.202855]
     }
 },

 {
   name: 'Maxim Smotrov',
   email: "max@gironhack.com",
   password: encryptedPass,
   isFixer: true,
   fee: 20,
   location: {
       type: "Point",
       coordinates: [41.410936, 2.199040]
     }
 },

 {
   name: 'Miguel Pastor',
   email: "miguel@ironhack.com",
   password: encryptedPass,
   isFixer: true,
   fee: 20,
   location: {
       type: "Point",
       coordinates: [41.396962, 2.182988]
     }
 },

 {
   name: 'Amanda Honkanen',
   email: "amanda@ironhack.com",
   password: encryptedPass,
   isFixer: true,
   fee: 20,
   location: {
       type: "Point",
       coordinates: [41.386612, 2.130826]
     }
 },

 {
   name: 'Marta Delgado',
   email: "marta@ironhack.com",
   password: encryptedPass,
   isFixer: true,
   fee: 20,
   location: {
       type: "Point",
       coordinates: [41.386943, 2.170588]
     }
 },



];

User.create(users, (err, docs) => {
 if (err) { throw err };

 docs.forEach( (user) => {
   console.log(user.name);
 });


 mongoose.connection.close();

});
