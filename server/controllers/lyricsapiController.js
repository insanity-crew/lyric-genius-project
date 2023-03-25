const axios = require('axios');

const apiKey = '7699037ed77776052d7259ec3fd44c44'; // Replace with your actual API key
const baseUrl = 'https://api.musixmatch.com/ws/1.1/';
const endpoint = 'matcher.lyrics.get';

const lyricsapiController = {};

lyricsapiController.getLyrics = async (req, res, next) => {
  try {
    const {songname, artist} = req.body
    const params = {
      q_track: songname,
      q_artist: artist,
      apikey: apiKey,
    };

    const response = await axios.get(baseUrl + endpoint, { params });

    if (response.status === 200) {
      const lyrics = response.data.message.body.lyrics;

      if (lyrics) {
        const lyricsBody = lyrics.lyrics_body;
        //console.log(lyricsBody)
        // console.log('Lyrics:\n', lyricsBody);
        res.locals.lyrics = lyricsBody;
        res.locals.artist = artist;
        res.locals.songname = songname;
        return next();
      } else {
        console.log('No lyrics found');
        throw new Error('No lyrics found');
      }
    } else {
      console.log('An error occurred:', response.status);
      throw new Error('API request failed');
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
    return next(error);
  }
};

module.exports = lyricsapiController;
