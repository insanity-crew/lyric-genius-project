const userController = require('../../server/controllers/userController.js');

describe('userController Test', () => {
  describe('create user', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;

    beforeEach(() => {
      mockRequest = {
        body: {
          name: 'jonathan',
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

    // nextFunction only invoked on error (prolly)
    it('acceptable name, email, password on req body continues to next middleware function', () => {
      userController.createUser(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).not.toHaveBeenCalled();
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
          name: 'jonathan',
          email: 'wrongEmail',
          password: 'password',
        },
      };

      userController.createUser(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });

    it('unacceptable password on req body returns error object', () => {
      mockRequest = {
        body: {
          name: 'jonathan',
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
          name: 'jonathan',
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
          name: 'jonathan',
          email: 'test@test.com',
          password: '',
        },
      };
      userController.verifyUser(mockRequest, mockResponse, nextFunction);
      expect(nextFunction.mock.calls[0][0].status).toBe(400);
    });
  });
});
