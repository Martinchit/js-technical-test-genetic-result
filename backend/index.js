require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8000;
const knexFile = require('./knexfile')[NODE_ENV];
const knex = require('knex')(knexFile);
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');
const error = require('./shared/error');
const services = require('./server/services');
const routers = require('./server/routers');
const middlewares = require('./server/middlewares');


const { App } = require('./server/main')(knex, config, logger, error, routers, services, middlewares);

const httpServer = http.createServer(App);

httpServer.listen(PORT, () => {
  logger.info(`http server running at ${PORT}`);
});
