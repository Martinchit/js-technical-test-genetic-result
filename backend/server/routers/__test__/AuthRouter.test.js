const Express = require('express');
const AuthRouter = require('../AuthRouter');

describe('AuthRouter', () => {
  let authRouter;
  let authService;
  let requestValidation;
  let req;
  const res = {
    json: jest.fn((x) => x),
    status: jest.fn(),
  };
  const successResult = 'token';
  const errorResult = { error: 'Test Error', code: 400 };

  const mockSuccessCase = () => {
    authService = {
      logIn: jest.fn().mockImplementation(() => Promise.resolve({ token: successResult })),
    };
    requestValidation = {
      validateLoginBody: jest.fn().mockImplementation(() => NextFunction())
    }
    authRouter = new AuthRouter(authService, requestValidation);
    res.status.mockReturnValue(res);
  };

  const mockFailCase = () => {
    authService = {
      logIn: jest.fn().mockImplementation(() => Promise.reject(errorResult)),
    };
    requestValidation = {
      validateLoginBody: jest.fn().mockImplementation(() => NextFunction())
    }
    authRouter = new AuthRouter(authService, requestValidation);
    res.status.mockReturnValue(res);
  };

  const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
  };

  it('should run router method successfully', () => {
    mockSuccessCase();
    authRouter.router();
    restoreMock();
  });

  it('should support logIn method', (done) => {
    mockSuccessCase();
    authRouter.logIn(req, res).then(() => {
      expect(authService.logIn).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ token : successResult });
      restoreMock();
      done();
    });
  });

  it('should handle logIn method error case', (done) => {
    mockFailCase();
    authRouter.logIn(req, res).then(() => {
      expect(authService.logIn).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(errorResult.code);
      expect(res.json).toHaveBeenCalledWith({ ...errorResult });
      done();
    });
  });
});