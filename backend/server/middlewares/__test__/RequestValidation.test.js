const joi = require('joi');
const RequestValidation = require('../RequestValidation');
const error = require('../../../shared/error');

describe('userService', () => {
  let requestValidation;
  let req;
  const res = {
    status: jest.fn(),
    json: jest.fn(),
  };
  let next = jest.fn();

  const mockResource = () => {
    req = {
      body: {
        email: 'test@test.com',
        password: '12345678',
      },
      headers: {
        authorization: 'Bearer 123456',
      },
      query: {
        type: 1,
      },
    };
  };

  const mockService = () => {
    requestValidation = new RequestValidation(joi, error);
    res.status.mockReturnValue(res);
  };

  const restoreMock = () => {
    res.json.mockRestore();
    res.status.mockRestore();
    next.mockRestore();
  };

  it('should pass validateLoginBody', () => {
    mockResource();
    mockService();
    requestValidation.validateLoginBody(req, res, next);
    expect(next).toBeCalled();
    restoreMock();
  });

  it('should not pass validateLoginBody with incorrect email value', () => {
    mockResource();
    mockService();
    req = { ...req, body: { email: '123', password: '12345678' } };
    requestValidation.validateLoginBody(req, res, next);
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      type: 'Validation Error',
      description: 'Incorrect / Missing value in request query',
      code: 400,
    });
    restoreMock();
  });

  it('should not pass validateLoginBody with incorrect password value', () => {
    mockResource();
    mockService();
    req = { ...req, body: { email: 'test@test.com', password: '123' } };
    requestValidation.validateLoginBody(req, res, next);
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      type: 'Validation Error',
      description: 'Incorrect / Missing value in request query',
      code: 400,
    });
    restoreMock();
  });

  it('should pass validateGetGeneticResultQuery', () => {
    mockResource();
    mockService();
    requestValidation.validateGetGeneticResultQuery(req, res, next);
    expect(next).toBeCalled();
    restoreMock();
  });

  it('should not pass validateLoginBody with incorrect type value', () => {
    mockResource();
    mockService();
    req = { ...req, query: { type: -1 } };
    requestValidation.validateGetGeneticResultQuery(req, res, next);
    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      type: 'Validation Error',
      description: 'Incorrect / Missing value in request query',
      code: 400,
    });
    restoreMock();
  });
});
