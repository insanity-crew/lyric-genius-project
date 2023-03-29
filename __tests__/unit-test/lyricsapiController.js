const lyricsapiController = require('../../server/controllers/lyricsapicontroller.js');

describe('lyricsapicontroller Test', () => {
  describe('get lyrics', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;

    beforeEach(() => {
      mockRequest = {
        body: {
          songname: 'test',
          artist: 'someArtist',
          trackId: '20',
        },
      };
      mockResponse = {
        locals: {},
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      nextFunction = jest.fn();
    });

    // nextFunction only invoked on error (prolly)
    it('acceptable songname, artist, tracknumber on req body continues to next middleware function with lyrics, songname, artist, tracknumber on res.locals', async () => {
      mockRequest = {
        body: {
          songname: 'Feel No Ways',
          artist: 'Drake',
          trackId: '20',
        },
      };

      await lyricsapiController.getLyrics(
        mockRequest,
        mockResponse,
        nextFunction
      );
      expect(mockResponse.locals.lyrics).not.toBe(null);
      expect(mockResponse.locals.artist).not.toBe(null);
      expect(mockResponse.locals.songname).not.toBe(null);
      expect(mockResponse.locals.trackId).not.toBe(null);
    });

    it('unacceptable songname on req body returns error object', () => {
      mockRequest = {
        body: {
          songname: '',
          artist: 'someArtist',
          trackId: '20',
        },
      };
      lyricsapiController.getLyrics(mockRequest, mockResponse, nextFunction);

      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });

    it('unacceptable artist on req body returns error object', () => {
      mockRequest = {
        body: {
          songname: 'test',
          artist: '',
          trackId: '20',
        },
      };

      lyricsapiController.getLyrics(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });

    it('unacceptable trackId on req body returns error object', () => {
      mockRequest = {
        body: {
          songname: 'test',
          artist: 'someArtist',
          trackId: '',
        },
      };

      lyricsapiController.getLyrics(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });
  });
});
