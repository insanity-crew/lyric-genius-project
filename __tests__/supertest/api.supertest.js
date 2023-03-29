const request = require('supertest');
const createServer = require('../../server/server.js');
const server = 'http://localhost:5001';

describe('Lyrics API', () => {
  describe('/api/lyricsapi', () => {
    describe('POST', () => {
      it('respond with status of 200 and body object with lyrics property', async () => {
        const response = await request(server)
          .post('/api/lyricsapi')
          .send({ songname: 'Feel No Ways', artist: 'Drake', trackId: '999' });
        expect(response.body);
        expect(response.status).toBe(200);
      }, 60000);
    });
  });
});

const app = createServer();
