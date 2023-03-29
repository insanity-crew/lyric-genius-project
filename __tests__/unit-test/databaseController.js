const databaseController = require('../../server/controllers/databaseController.js');
const Song = require('../../server/models/lyricModel.js');
const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://iterationDB:iterationDB@cluster0.8frqam3.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'lyric-genius-project',
  })
  // .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

describe('databaseController Test', () => {
  describe('.createEntry Method Test', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;

    beforeEach(() => {
      mockResponse = {
        locals: {
          lyrics: 'these are the lyrics',
          artist: 'artist',
          title: 'songname',
          trackId: '918273012',
        },
      };
      mockRequest = {};
      nextFunction = jest.fn();
    });

    afterAll(async () => {
      await Song.deleteOne({ trackId: '918273012' });
    });

    // nextFunction only invoked on error (prolly)
    it('acceptable lyrics, artist, songname, trackId on res.locals continues to next middleware function', async () => {
      await databaseController.createEntry(
        mockRequest,
        mockResponse,
        nextFunction
      );
      expect(mockResponse.locals.newSong._id).not.toBe(undefined);
    });

    it('unacceptable lyrics on req body returns error object', () => {
      mockResponse = {
        locals: {
          lyrics: '',
          artist: 'artist',
          title: 'songname',
          trackId: '918273012',
        },
      };
      databaseController.createEntry(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });

    it('unacceptable artist on res.locals returns error object', () => {
      mockResponse = {
        locals: {
          lyrics: 'these are the lyrics',
          artist: '',
          title: 'songname',
          trackId: '918273012',
        },
      };

      databaseController.createEntry(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });

    it('unacceptable songname on res.locals returns error object', () => {
      mockResponse = {
        locals: {
          lyrics: 'these are the lyrics',
          artist: 'artist',
          title: '',
          trackId: '918273012',
        },
      };

      databaseController.createEntry(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });

    it('unacceptable trackId on res.locals returns error object', () => {
      mockResponse = {
        locals: {
          lyrics: 'these are the lyrics',
          artist: 'artist',
          title: '',
          trackId: '',
        },
      };
      databaseController.createEntry(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });
  });

  describe('getSong method', () => {
    beforeEach(() => {
      mockRequest = {
        params: {
          id: '918273013',
        },
      };
      mockResponse = {
        locals: {},
      };
      nextFunction = jest.fn();
    });

    afterAll(async () => {
      await Song.deleteOne({ trackId: '918273013' });
    });

    it('acceptable id passes through to next middleware', async () => {
      await Song.create({
        title: 'test',
        artist: 'test',
        lyrics: 'test',
        trackId: '918273013',
      });
      await databaseController.getSong(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.locals.foundSong).not.toBe(undefined);
    });
  });
});
