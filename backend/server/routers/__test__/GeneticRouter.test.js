const Express = require('express');
const GeneticRouter = require('../GeneticRouter');

describe('GeneticRouter', () => {
  let geneticRouter;
  let geneticService;
  let requestValidation;
  let authMiddleware;
  let req;
  const res = {
    json: jest.fn(x => x),
    status: jest.fn(),
  };
  const successResult = 'good';
  const errorResult = { error: 'Test Error', code: 400 };

  const mockSuccessCase = () => {
    geneticService = {
      getResult: jest.fn().mockImplementation(() => Promise.resolve(successResult)),
    };
    requestValidation = {
      validateGetGeneticResultQuery: jest.fn().mockImplementation(() => NextFunction()),
    };
    authMiddleware = {
      decryptBearerToken: jest.fn().mockImplementation(() => NextFunction()),
    };
    geneticRouter = new GeneticRouter(geneticService, authMiddleware, requestValidation);
    res.status.mockReturnValue(res);
  };

  const mockFailCase = () => {
    geneticService = {
      getResult: jest.fn().mockImplementation(() => Promise.reject(errorResult)),
    };
    requestValidation = {
      validateGetGeneticResultQuery: jest.fn().mockImplementation(() => NextFunction()),
    };
    authMiddleware = {
      decryptBearerToken: jest.fn().mockImplementation(() => NextFunction()),
    };
    geneticRouter = new GeneticRouter(geneticService, authMiddleware, requestValidation);
    res.status.mockReturnValue(res);
  };

  const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
  };

  it('should run router method successfully', () => {
    mockSuccessCase();
    geneticRouter.router();
    restoreMock();
  });

  it('should support getResult method', done => {
    mockSuccessCase();
    geneticRouter.getResult(req, res).then(() => {
      expect(geneticService.getResult).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ result: successResult });
      restoreMock();
      done();
    });
  });

  it('should handle getResult method error case', done => {
    mockFailCase();
    geneticRouter.getResult(req, res).then(() => {
      expect(geneticService.getResult).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(errorResult.code);
      expect(res.json).toHaveBeenCalledWith({ ...errorResult });
      done();
    });
  });
});
