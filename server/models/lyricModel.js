const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://lyricgenius:mm5vpspok3ibmCaw@lyricgeniusproject.jlm7hpg.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'lyric-genius-project',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: String,
  artist: String,
  lyrics: String,
  trackId: String,
});

const Song = mongoose.model('song', songSchema);

module.exports = Song;
