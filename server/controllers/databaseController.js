const mongoose = require('mongoose');
const Song = require('../models/lyricModel');

const databaseController = {};
databaseController.createEntry = async (req, res, next) => {
  // get lyrics from res.locals object from chatgpt
  const { lyrics, artist, title, trackId } = res.locals;

  if (lyrics.length < 1)
    return next({
      log:
        'Invalid lyrics param in databaseController.createEntry middleware function',
      status: 400,
      message: {
        err:
          ' Invalid lyrics param in databaseController.createEntry middleware function',
      },
    });
  if (artist.length < 1)
    return next({
      log:
        'Invalid artist param in databaseController.createEntry middleware function',
      status: 400,
      message: {
        err:
          ' Invalid artist param in databaseController.createEntry middleware function',
      },
    });
  if (!trackId.length)
    return next({
      log:
        'Invalid trackid param in databaseController.createEntry middleware function',
      status: 400,
      message: {
        err:
          'Invalid trackid param in databaseController.createEntry middleware function',
      },
    });
  if (title.length < 1)
    return next({
      log:
        'Invalid songname param in databaseController.createEntry middleware function',
      status: 400,
      message: {
        err:
          'Invalid songname param in databaseController.createEntry middleware function',
      },
    });

  // save lyrics onto database
  try {
    const newSong = await Song.create({
      lyrics,
      artist,
      title,
      trackId,
    });
    res.locals.newSong = newSong;
    return next();
  } catch (err) {
    return next({
      log:
        'Express error handler caught at databaseController.createEntry middleware error',
      status: 400,
      message: { err: 'Cannot create song entry in db' },
    });
  }
};

databaseController.getSong = async (req, res, next) => {
  const trackId = req.params.id;
  if (!typeof trackId === 'number')
    return next({
      log:
        'Invalid trackid param in databaseController.createEntry middleware function',
      status: 400,
      message: {
        err:
          'Invalid trackid param in databaseController.createEntry middleware function',
      },
    });
  try {
    const song = await Song.findOne({ trackId });
    res.locals.foundSong = song;
    return next();
  } catch (err) {
    return next({
      log:
        'Express error handler caught error at databaseController.getSong middleware error',
      status: 400,
      message: { err: err },
    });
  }
};

module.exports = databaseController;
