var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

//Default mongoose connection
const mongoDB = "mongodb+srv://admin_Christian:databasep@ssword22@cluster0-r9zhj.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("err", console.error.bind(console, "MongoDB connection error:"));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const goalsRouter = require("./routes/goals");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/users/goals", goalsRouter);

module.exports = app;

/* Set url as a virtual in models when possible */