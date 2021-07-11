const Express = require('express');
const UserRouter = require('../UserRouter');

describe('UserRouter', () => {
  let userRouter;
  let userService;
  let requestValidation;
  let req;
  const res = {
    json: jest.fn((x) => x),
    status: jest.fn(),
  };
  const successResult = 'good';
  const errorResult = { error: 'Test Error', code: 400 };

  const mockSuccessCase = () => {
    userService = {
      getPersonalInfo: jest.fn().mockImplementation(() => Promise.resolve(successResult)),
    };
    authMiddleware = {
      decryptBearerToken: jest.fn().mockImplementation(() => NextFunction())
    };
    userRouter = new UserRouter(userService, authMiddleware);
    res.status.mockReturnValue(res);
  };

  const mockFailCase = () => {
    userService = {
      getPersonalInfo: jest.fn().mockImplementation(() => Promise.reject(errorResult)),
    };
    authMiddleware = {
      decryptBearerToken: jest.fn().mockImplementation(() => NextFunction())
    };
    userRouter = new UserRouter(userService, authMiddleware);
    res.status.mockReturnValue(res);
  };

  const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
  };

  it('should run router method successfully', () => {
    mockSuccessCase();
    userRouter.router();
    restoreMock();
  });

  it('should support getPersonalInfo method', (done) => {
    mockSuccessCase();
    userRouter.getPersonalInfo(req, res).then(() => {
      expect(userService.getPersonalInfo).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ data: successResult });
      restoreMock();
      done();
    });
  });

  it('should handle getPersonalInfo method error case', (done) => {
    mockFailCase();
    userRouter.getPersonalInfo(req, res).then(() => {
      expect(userService.getPersonalInfo).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(errorResult.code);
      expect(res.json).toHaveBeenCalledWith({ ...errorResult });
      done();
    });
  });
});