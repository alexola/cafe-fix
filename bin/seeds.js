const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/coffee-fix');
const User = require('../models/user');
var salt = bcrypt.genSaltSync(bcryptSalt);

const password = "1234";
var encryptedPass = bcrypt.hashSync(password, salt);

const users = [
  {
    name: 'Alejandro Olalde',
    email: "alexola.22@gmail.com",
    password: encryptedPass,
    isFixer: true,
    fee: 20
  }

];

User.create(users, (err, docs) => {
  if (err) { throw err };

  docs.forEach( (user) => {
    console.log(user.name);
  });


  mongoose.connection.close();

});
