//Einer Cupino - 301233614 - COMP229 Section 004 - Feb 19, 2022
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//Modules for Authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//Modules for Database setup
let mongoose = require('mongoose');
let DB = require('./db');

//Point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('strictQuery',false);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console,'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log("Connected to MongoDB...");
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let userlistRouter = require('../routes/userlist'); //Pointing to the DB

let app = express();

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//Setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//Initialize flash
app.use(flash());

//Intialize passport
app.use(passport.initialize());
app.use(passport.session());

//Passport user configuration

//Create a Member Model Instance
let memberModel = require('../models/member');
let Member = memberModel.Member;

//Implement a User Authentication Strategy
passport.use(Member.createStrategy());

//Serialize and deserialize the user info
passport.serializeUser(Member.serializeUser());
passport.deserializeUser(Member.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user-list', userlistRouter); //Point to the DB page

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title : 'Error'});
});

module.exports = app;
