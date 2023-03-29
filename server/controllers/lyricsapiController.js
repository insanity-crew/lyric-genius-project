const axios = require('axios');

const apiKey = '7699037ed77776052d7259ec3fd44c44'; // Replace with your actual API key
const baseUrl = 'https://api.musixmatch.com/ws/1.1/';
const endpoint = 'matcher.lyrics.get';

const lyricsapiController = {};

lyricsapiController.getLyrics = async (req, res, next) => {
  const { songname, artist, trackId } = req.body;

  if (songname.length < 1)
    return next({
      log:
        'Invalid songname param in lyricsapiController.getLyrics middleware function',
      status: 400,
      message: {
        err:
          ' Invalid songname param in lyricsapiController.getLyrics middleware function',
      },
    });
  if (artist.length < 1)
    return next({
      log:
        'Invalid artist param in lyricsapiController.getLyrics middleware function',
      status: 400,
      message: {
        err:
          ' Invalid artist param in lyricsapiController.getLyrics middleware function',
      },
    });
  if (!trackId.length)
    return next({
      log:
        'Invalid trackid param in lyricsapiController.getLyrics middleware function',
      status: 400,
      message: {
        err:
          'Invalid trackid param in lyricsapiController.getLyrics middleware function',
      },
    });
  const params = {
    q_track: songname,
    q_artist: artist,
    apikey: apiKey,
  };
  try {
    const response = await axios.get(baseUrl + endpoint, { params });
    const lyrics = response.data.message.body.lyrics;

    if (lyrics) {
      const lyricsBody = lyrics.lyrics_body;
      res.locals.lyrics = lyricsBody;
      res.locals.artist = artist;
      res.locals.songname = songname;
      res.locals.trackId = trackId;
      return next();
    } else {
      return next({
        log:
          'Error occured in lyricsapiController.getLyric - API could not find song with that title / artist',
        status: 400,
        message: {
          err:
            'Error occured in lyricsapiController.getLyric - API could not find song with that title / artist',
        },
      });
    }
  } catch (error) {
    return next({
      log: 'Error occured in lyricsapiController.getLyric - Bad API Connection',
      status: 400,
      message: {
        err: error,
      },
    });
  }
};

module.exports = lyricsapiController;
