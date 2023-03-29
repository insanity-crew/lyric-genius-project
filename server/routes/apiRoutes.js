const express = require('express');
const router = express.Router();
const gptapiController = require('../controllers/gptapiController');
const lyricsapiController = require('../controllers/lyricsapiController');
const databaseController = require('../controllers/databaseController');

router.get(
  '/lyricsapi',
  // res.locals res.locals.lyrics = lyricsBody;
  // res.locals.artist = artist;
  // res.locals.songname = songname;
  // res.locals.trackId = trackId;
  lyricsapiController.getLyrics,
  // gptapiController.genLyrics,
  // databaseController.createEntry,
  (req, res) => {
    console.log('Lyrics:', res.locals.lyrics);
    res.status(200).json({ lyrics: res.locals.lyrics });
  }
);

router.get('/:id', databaseController.getSong, (req, res) => {
  res.status(200).json(res.locals.foundSong);
});
module.exports = router;
