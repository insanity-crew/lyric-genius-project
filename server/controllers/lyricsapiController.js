const axios = require('axios');

const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const baseUrl = 'https://api.musixmatch.com/ws/1.1/';
const endpoint = 'matcher.lyrics.get';

// Parameters for the API request
const params = {
  q_track: 'sexy and i know it',
  q_artist: 'lmfao',
  apikey: apiKey,
};

// Make the API request
axios
  .get(baseUrl + endpoint, { params })
  .then((response) => {
    // Check if the request was successful
    if (response.status === 200) {
      // Extract the lyrics body from the JSON response
      const lyricsBody = response.data.message.body.lyrics.lyrics_body;
      console.log('Lyrics:\n', lyricsBody);
    } else {
      console.log('An error occurred:', response.status);
    }
  })
  .catch((error) => {
    console.error('An error occurred:', error.message);
  });
