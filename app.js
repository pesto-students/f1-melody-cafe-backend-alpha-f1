const express = require('express');
const path = require('path');
const logger = require('morgan')
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users');
const albumRouter = require('./routes/album');
const streamSongRouter = require('./routes/audioStream');
const trackRouter = require('./routes/track');
const albumTrackRouter = require('./routes/albumTrack');
const app = express();

//const {winstonLogger} = require('./services/serviceIntiaters');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', usersRouter);
app.use('/albums',albumRouter);
app.use('/stream',streamSongRouter);
app.use('/track',trackRouter);
app.use('/album/:albumId',albumTrackRouter)
//app.set('logger',winstonLogger);
//app.set('databaseManager',databaseManager);

module.exports = app;
