const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://yiningcw:ar6QywwxQs61uAe3@mernapp.r9sezjx.mongodb.net/test';

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
})

const Song = mongoose.model('song', songSchema)


module.exports = Song;