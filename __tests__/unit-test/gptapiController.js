const gptapiController = require('../../server/controllers/gptapiController.js');

describe('gptapiController Test', () => {
  describe('.genLyrics Method Test', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;

    beforeEach(() => {
      mockResponse = {
        locals: {
          lyrics: 'these are the lyrics',
          artist: 'artist',
          songname: 'songname',
          trackID: 20,
        },
      };
      mockRequest = {};
      nextFunction = jest.fn();
    });

    // nextFunction only invoked on error (prolly)
    it('acceptable lyrics, artist, songname, trackId on res.locals continues to next middleware function', () => {
      gptapiController.genLyrics(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('unacceptable lyrics on req body returns error object', () => {
      mockResponse = {
        locals: {
          lyrics: '',
          artist: 'artist',
          songname: 'songname',
          trackID: 20,
        },
      };
      gptapiController.genLyrics(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });

    it('unacceptable artist on res.locals returns error object', () => {
      mockResponse = {
        locals: {
          lyrics: 'these are the lyrics',
          artist: '',
          songname: 'songname',
          trackID: 20,
        },
      };

      gptapiController.genLyrics(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });

    it('unacceptable songname on res.locals returns error object', () => {
      mockResponse = {
        locals: {
          lyrics: 'these are the lyrics',
          artist: 'artist',
          songname: '',
          trackID: 20,
        },
      };

      gptapiController.genLyrics(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });

    it('unacceptable trackId on res.locals returns error object', () => {
      mockResponse = {
        locals: {
          lyrics: 'these are the lyrics',
          artist: 'artist',
          songname: '',
          trackID: '',
        },
      };
      gptapiController.genLyrics(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });
  });
});
