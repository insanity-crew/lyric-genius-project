const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: String,
  artist: String,
  lyrics: String,
  trackId: String,
});

const Song = mongoose.model('song', songSchema);

module.exports = Song;
