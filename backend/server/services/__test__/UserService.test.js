const UserService = require('../UserService');
const error = require('../../../shared/error');

describe('userService', () => {
  let userService;
  let req;
  const res = {
    status: jest.fn(),
    json: jest.fn(),
  };
  let next = jest.fn();
  const userId = 1;
  const profile = {
    id: 1,
    email: 'test@test.com',
    password: '12345678',
    createdAt: '2010-10-10 00:00:00',
    updatedAt: '2010-10-10 00:00:00',
  };
  let models;
  let logger;
  const waitForAsync = () => new Promise(resolve => setImmediate(resolve));
  const testError = 'testError';

  const mockResource = (error = false) => {
    req = {
      userId,
    };
    models = () => {
      return {
        select: () => ({
          where: () => ({
            first: jest
              .fn()
              .mockImplementation(() =>
                error ? Promise.reject(testError) : Promise.resolve(profile),
              ),
          }),
        }),
      };
    };
    logger = {
      error: jest.fn(),
    };
  };

  const mockService = () => {
    userService = new UserService(models, logger, error);
    res.status.mockReturnValue(res);
  };

  const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
    next.mockRestore();
    models()
      .select()
      .where()
      .first.mockRestore();
  };

  it('return profile getPersonalInfo', async () => {
    mockResource();
    mockService();
    const result = await userService.getPersonalInfo(req);
    await waitForAsync();
    expect(result).toEqual(profile);
    restoreMock();
  });

  it('handles error thrown', async () => {
    mockResource(true);
    mockService();
    try {
      await userService.getPersonalInfo(req);
    } catch (error) {
      expect(logger.error).toHaveBeenCalled();
      expect(error).toStrictEqual({
        description: 'Failed to fulfill the request',
        type: 'Request Error',
        code: 400,
      });
    }
    restoreMock();
  });
});
