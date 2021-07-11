const GeneticService = require('../GeneticService');
const error = require('../../../shared/error');

describe('userService', () => {
  let geneticService;
  let req;
  const res = {
    status: jest.fn(),
    json: jest.fn(),
  };
  let next = jest.fn();
  const userId = 1;
  const result = {
    id: 1,
    email: 'test@test.com',
    password: '12345678',
    createdAt: '2010-10-10 00:00:00',
    updatedAt: '2010-10-10 00:00:00',
  };
  let models;
  let logger;
  const testError = 'testError';

  const mockResource = (error = false) => {
    req = {
      userId,
      query: {},
    };
    models = () => {
      return {
        select: () => ({
          innerJoin: () => ({
            where: () => ({
              first: jest
                .fn()
                .mockImplementation(() =>
                  error ? Promise.reject(testError) : Promise.resolve(result),
                ),
            }),
          }),
        }),
      };
    };
    logger = {
      error: jest.fn(),
    };
  };

  const mockService = () => {
    geneticService = new GeneticService(models, logger, error);
    res.status.mockReturnValue(res);
  };

  const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
    next.mockRestore();
    models()
      .select()
      .innerJoin()
      .where()
      .first.mockRestore();
  };

  it('return geneticResult getResult', async () => {
    mockResource();
    mockService();
    const result = await geneticService.getResult(req);
    expect(result).toEqual(result);
    restoreMock();
  });

  it('handles error thrown', async () => {
    mockResource(true);
    mockService();
    req = { ...req, query: { type: 1 } };
    try {
      await geneticService.getResult(req);
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
