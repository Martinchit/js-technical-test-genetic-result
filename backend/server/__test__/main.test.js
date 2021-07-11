const request  = require('supertest');
const knexFile = require('../../knexfile')['development'];
const knex = require('knex')(knexFile);
const config = require('../../utils/config');
const logger = require('../../utils/logger');
const error = require('../../shared/error');

const AuthRouter = require('../routers/AuthRouter')
const GeneticRouter = require('../routers/GeneticRouter')
const UserRouter = require('../routers/UserRouter')
const AuthService = require('../services/AuthService')
const GeneticService = require('../services/GeneticService')
const UserService = require('../services/UserService')
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const RequestValidation = require('../middlewares/RequestValidation')

// Test Passport Authentication with supertest
describe('App', () => {
  const Routers = {
    AuthRouter,
    GeneticRouter,
    UserRouter
  }
  const Services = {
    AuthService,
    GeneticService,
    UserService
  }
  const Middlewares = {
    AuthMiddleware,
    RequestValidation
  }
  const { App } = require('../main')(knex, config, logger, error, Routers, Services, Middlewares);

  it('should return 401 in /api/user route without token', (done) => {
    request(App)
      .get('/api/user')
      .end((err, res) => {
        expect(res.unauthorized).toBeTruthy();
        expect(res.statusCode).toBe(401);
        done();
      });
  });

  it('should return 401 in /api/genetic route without token', (done) => {
    request(App)
      .post('/api/genetic')
      .end((err, res) => {
        expect(res.unauthorized).toBeTruthy();
        expect(res.statusCode).toBe(401);
        done();
      });
  });
});