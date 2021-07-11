require('dotenv').config();
const Express = require('express');
const CORS = require('cors');
const JWT = require('jsonwebtoken');
const Morgan = require('morgan');
const BCRYPT = require('bcrypt');
const JOI = require('joi');
const passport = require('../utils/passport');

module.exports = (knex, config, logger, error, routers, services, middlewares) => {
  const { AuthRouter, GeneticRouter, UserRouter } = routers;
  const { AuthService, GeneticService, UserService } = services;
  const { AuthMiddleware, RequestValidation } = middlewares;

  const passportAuth = passport(config, knex);
  passportAuth.initialize();

  const App = Express();
  App.use(Express.json());
  App.use(Express.urlencoded({ extended: true }));
  App.use(CORS());
  App.use(Morgan('combined'));

  const authService = new AuthService(knex, JWT, BCRYPT, logger, error, config);
  const geneticService = new GeneticService(knex, logger, error);
  const userService = new UserService(knex, logger, error);

  const requestValidation = new RequestValidation(JOI, error);
  const authMiddleware = new AuthMiddleware(JWT, error);

  App.use('/api/auth', new AuthRouter(authService, requestValidation).router());
  App.use(
    '/api/genetic',
    passportAuth.authenticate(),
    new GeneticRouter(geneticService, authMiddleware, requestValidation).router(),
  );
  App.use(
    '/api/user',
    passportAuth.authenticate(),
    new UserRouter(userService, authMiddleware).router(),
  );

  return {
    App: App,
  };
};
