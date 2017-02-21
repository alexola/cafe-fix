var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const flash          = require("connect-flash");
const bcrypt             = require('bcrypt');
const passport           = require('passport');
const LocalStrategy      = require('passport-local').Strategy;
const connectSession = require("connect-ensure-login");


var index = require('./routes/index');
var users = require('./routes/users');

var authController = require('./routes/authController');
const fixing = require("./routes/fixing");

const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
var app = express();
const mongoose = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/coffee-fix");
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
 secret: 'Find a fixer near you',
 resave: true,
 saveUninitialized: true,
 cookie: { maxAge: 500000 },
 store: new MongoStore({
   mongooseConnection: mongoose.connection,
   ttl: 24 * 60 * 60 // 1 day
 })
}));

app.use((req, res, next) => {
 if (req.session.currentUser) {
   res.locals.currentUserInfo = req.session.currentUser;
   res.locals.isUserLoggedIn = true;
 } else {
   res.locals.isUserLoggedIn = false;
 }

 next();
});

// app.use('/', index);
// app.use('/users', users);
app.use('/', authController);
app.use("/", fixing);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
