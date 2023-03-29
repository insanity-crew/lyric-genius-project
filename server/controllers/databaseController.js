const mongoose = require('mongoose');
const Song = require('../models/lyricModel');
const User = require('../models/userModel');

const databaseController = {};

databaseController.createEntry = async (req, res, next) => {
  // get lyrics from res.locals object from chatgpt
  const { response, artist, songname, trackId } = res.locals;
  console.log('response from databse:', res.locals.response);

  // save lyrics onto database
  try {
    const newSong = await Song.create({
      name: songname,
      artist: artist,
      lyrics: response,
      trackId,
    });
    res.locals.newSong = newSong;
    return next();
  } catch (err) {
    return next({
      log: 'Express error handler caught at databaseController.createEntry middleware error',
      status: 400,
      message: { err: 'Cannot create song entry in db' },
    });
  }
};

databaseController.getSong = async (req, res, next) => {
  // console.log('trackId', typeof trackId);

  try {
    const trackId = req.params.id;
    // console.log('name', name);
    const song = await Song.findOne({ trackId: trackId });
    res.locals.foundSong = song;
    return next();
  } catch (err) {
    console.error('Error in databaseController.getSong:', err);
    return next({
      log: 'Express error handler caught at databaseController.getSong middleware error',
      status: 400,
      message: { err: 'Cannot get song from db' },
    });
  }
};

// find user using ssid
databaseController.getUserName = async (ssid) => {
  try {
    console.log('in getusername');
    const user = await User.findOne({ _id: ssid });
    return user.name;
  } catch (err) {
    console.log('error in getUserName');
  }
};

databaseController.getUser = async (req, res, next) => {
  try {
    console.log('in getusername');
    const user = await User.findOne({ _id: req.body.cookie });
    res.locals.id = user;
    return next();
  } catch (err) {
    console.log('error in getUserName');
  }
};

module.exports = databaseController;
