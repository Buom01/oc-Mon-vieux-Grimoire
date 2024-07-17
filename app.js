var express = require('express');
var logger = require('morgan');
var cors = require('cors');

var config = require('./config');

var authRouter = require('./routes/auth');
var booksRouter = require('./routes/books');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: config.frontendHostname, methods: '*'}));

app.use('/api/auth', authRouter);
app.use('/api/books', booksRouter);
app.use('/uploads', express.static('uploads'));

module.exports = app;
