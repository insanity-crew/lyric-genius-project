const mongoose = require('mongoose');
const Song = require('../models/lyricModel');

const databaseController = {};
databaseController.createEntry = async (req, res, next) => {
  // get lyrics from res.locals object from chatgpt
  const { response, artist, songname } = res.locals;
  console.log('response from databse:', res.locals.response)

  // save lyrics onto database
  try {
    const newSong = await Song.create({name:songname, artist, lyrics:response });
    res.locals.newSong = newSong;
    return next();
  } catch (err) {
    return next({
      log: 'Express error handler caught at databaseController.createEntry middleware error',
      status: 400,
      message: { err: 'Cannot create song entry in db' },
    })
  }
}

module.exports = databaseController;