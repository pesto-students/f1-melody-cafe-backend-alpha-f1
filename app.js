const express = require('express');
const path = require('path');
const logger = require('morgan')
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();
//const {winstonLogger} = require('./services/serviceIntiaters');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.set('logger',winstonLogger);
//app.set('databaseManager',databaseManager);

module.exports = app;
