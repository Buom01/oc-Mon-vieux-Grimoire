var express = require('express');
var logger = require('morgan');

var authRouter = require('./routes/auth');
var booksRouter = require('./routes/books');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRouter);
app.use('/api/books', booksRouter);

module.exports = app;
