const AuthMiddleware = require('../AuthMiddleware');
const error = require('../../../shared/error');

describe('userService', () => {
  let authMiddleware;
  let req;
  const res = {
    status: jest.fn(),
    json: jest.fn(),
  };
  let next = jest.fn();
  let jwt;
  const id = 1;
  const testError = 'testError';

  const mockResource = (error = false) => {
    req = {
      headers: {
        authorization: 'Bearer 123456',
      },
    };
    jwt = {
      verify: jest
        .fn()
        .mockImplementation(() => (error ? Promise.reject(testError) : Promise.resolve({ id }))),
    };
  };

  const mockService = () => {
    authMiddleware = new AuthMiddleware(jwt, error);
    res.status.mockReturnValue(res);
  };

  const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
    next.mockRestore();
    jwt.verify.mockRestore();
  };

  it('return authMiddleware decryptBearerToken', async () => {
    mockResource();
    mockService();
    await authMiddleware.decryptBearerToken(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.userId).toEqual(id);
    restoreMock();
  });

  it('handles error thrown', async () => {
    mockResource(true);
    mockService();
    try {
      await authMiddleware.decryptBearerToken(req, res, next);
    } catch (error) {
      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalled();
    }
    restoreMock();
  });
});
