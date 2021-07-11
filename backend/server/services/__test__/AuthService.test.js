const AuthService = require('../AuthService');
const error = require('../../../shared/error');

describe('AuthService', () => {
  let authService;
  let req;
  const res = {
    status: jest.fn(),
    json: jest.fn(),
  };
  let next = jest.fn();
  const hashPassword = 'hashPassword';
  const token = 'token';
  const user = {
    id: 1,
    email: 'test@test.com',
    password: '12345678',
    createdAt: '2010-10-10 00:00:00',
    updatedAt: '2010-10-10 00:00:00',
  };
  const config = { jwtSecret: 'secret' };
  let models;
  let jwt;
  let bcrypt;
  let logger;
  const waitForAsync = () => new Promise(resolve => setImmediate(resolve));

  const mockResource = (emptyModel = false) => {
    req = {
      body: {
        email: user.email,
        password: user.password,
      },
    };
    models = () => {
      return {
        select: () => ({
          where: jest.fn().mockImplementation(() => Promise.resolve(emptyModel ? [] : [user])),
        }),
      };
    };
    jwt = {
      sign: jest.fn().mockImplementation(() => Promise.resolve(token)),
    };
    bcrypt = {
      hash: jest.fn().mockImplementation(() => Promise.resolve(hashPassword)),
      compare: jest.fn().mockImplementation(password => Promise.resolve(hashPassword === password)),
    };
    logger = {
      error: jest.fn(),
    };
  };

  const mockService = () => {
    authService = new AuthService(models, jwt, bcrypt, logger, error, config);
    res.status.mockReturnValue(res);
  };

  const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
    next.mockRestore();
    models()
      .select()
      .where.mockRestore();
    jwt.sign.mockRestore();
    bcrypt.hash.mockRestore();
    bcrypt.compare.mockRestore();
  };

  it('return token for log in', async () => {
    mockResource();
    req = {
      body: {
        email: user.email,
        password: hashPassword,
      },
    };
    mockService();
    const result = await authService.logIn(req);
    await waitForAsync();
    expect(result).toEqual({ token });
    restoreMock();
  });

  it('return error for log in when password is incorrect', async () => {
    mockResource();
    mockService();
    try {
      await authService.logIn({
        body: {
          email: 'test@test.com',
          password: '23445631',
        },
      });
    } catch (error) {
      expect(logger.error).toHaveBeenCalled();
      expect(error).toStrictEqual({
        description: 'Please try again',
        type: 'Log In Error',
        code: 400,
      });
    }
    restoreMock();
  });

  it('return error for log in when email is not found', async () => {
    mockResource(true);
    mockService();
    try {
      await authService.logIn(req, res, next);
    } catch (error) {
      expect(logger.error).toHaveBeenCalled();
      expect(error).toStrictEqual({
        description: 'Please try again',
        type: 'Log In Error',
        code: 400,
      });
    }
    restoreMock();
  });
});
