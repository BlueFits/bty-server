var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

//Default mongoose connection
const mongoDB = "mongodb+srv://admin_Christian:databasep@ssword22@cluster0-r9zhj.mongodb.net/btyCollection?retryWrites=true&w=majority"
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("err", console.error.bind(console, "MongoDB connection error:"));
mongoose.set("useFindAndModify", false);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const adminRouter = require("./routes/admin");

var app = express();

//View Engine
app.set("view engine", "pug");
//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//SESSION
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}));

//PASSPORT CONFIG FOR ADMIN
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

/* Non-user Routes */
app.use('/', indexRouter);
/* User Routes */
app.use('/users', usersRouter);
/* Admin Routes */
app.use("/admin", adminRouter);

module.exports = app;

/* Set url as a virtual in models when possible */