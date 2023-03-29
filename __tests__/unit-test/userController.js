const userController = require('../../server/controllers/userController.js');
const User = require('../../server/models/userModel.js');

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

describe('userController Test', () => {
  describe('.createUser Method Test', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;

    beforeEach(() => {
      mockRequest = {
        body: {
          name: 'test',
          email: 'test@test.com',
          password: 'test',
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
    it('acceptable name, email, password on req body continues to next middleware function', async () => {
      await userController.createUser(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.locals.success);
      await User.deleteOne({name: 'test'});
    });

    it('unacceptable name on req body returns error object', () => {
      mockRequest = {
        body: {
          name: '',
          email: 'someEmail@gmail.com',
          password: 'password',
        },
      };
      userController.createUser(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });

    it('unacceptable email on req body returns error object', () => {
      mockRequest = {
        body: {
          name: 'test',
          email: 'test inncorrect email',
          password: 'test',
        },
      };

      userController.createUser(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });

    it('unacceptable password on req body returns error object', () => {
      mockRequest = {
        body: {
          name: 'test',
          email: 'test@test.com',
          password: '',
        },
      };

      userController.createUser(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });
  });

  describe('verify user', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;

    beforeEach(() => {
      mockRequest = {
        body: {
          email: 'someEmail@me.com',
          password: 'password',
        },
      };
      mockResponse = {
        locals: {},
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      nextFunction = jest.fn();
    });

    it('acceptable email and password on req body continues to next middleware function', () => {
      userController.verifyUser(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('unacceptable email on req body returns error object', () => {
      mockRequest = {
        body: {
          name: 'test',
          email: 'wrongEmail',
          password: 'password',
        },
      };
      userController.verifyUser(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });

    it('unacceptable password on req body returns error object', () => {
      mockRequest = {
        body: {
          name: 'test',
          email: 'test@test.com',
          password: '',
        },
      };
      userController.verifyUser(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });
  });
});
